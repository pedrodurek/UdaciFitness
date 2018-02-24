import React, { Component } from 'react'
import { View, Text, TouchableOpacity, Platform, StyleSheet } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import { getMetricMetaInfo, timeToString } from '../utils/helpers'
import { submitEntry, removeEntry } from '../utils/api'
import UdaciSlider from './UdaciSlider'
import UdaciStepper from './UdaciStepper'
import DateHeader from './DateHeader'
import TextButton from './TextButton'
import { connect } from 'react-redux'
import { addEntry } from '../actions'
import { getDailyReminderValue } from '../utils/helpers'
import { white, purple } from '../utils/colors'

const SubmitBtn = ({ onPress }) => (
    <TouchableOpacity 
        style={Platform.OS === 'ios'? styles.iosSubmitBtn : styles.androidSubmitBtn}
        onPress={onPress}
    >
        <Text style={styles.submitBtnText}>Submit</Text>
    </TouchableOpacity>
)

class AddEntry extends Component {
    state = {
        run: 0,
        bike: 0,
        swim: 0,
        sleep: 0,
        eat: 0
    }

    increment = (metric) => {
        const { max, step } = getMetricMetaInfo(metric)
        this.setState((state) => {
            const count = state[metric] + step
            return {
                ...state,
                [metric]: count > max ? max : count
            }
        })
    }

    decrement = (metric) => {
        const { step } = getMetricMetaInfo(metric)
        this.setState((state) => {
            const count = state[metric] - step
            return {
                ...state,
                [metric]: count < 0 ? 0 : count
            }
        })
    }

    slider = (metric, value) => {
        this.setState({ [metric]: value })
    }

    submit = () => {
        const key = timeToString()
        console.log(this.props)
        const entry = this.state
        this.props.addEntry({
            [key]: entry
        })

        this.setState({ run: 0, bike: 0, swim: 0, sleep: 0, eat: 0 })
        // Navigate to home

        submitEntry({ key, entry })

        // Clear local notification
    }

    reset = () => {
        const key = timeToString()
        this.props.addEntry({
            [key]: getDailyReminderValue()
        })

        // Route to home

        removeEntry(key)
    }

    render() {
        const metaInfo = getMetricMetaInfo()

        if (this.props.alreadyLogged) {
            return (
                <View style={styles.center}>
                    <Ionicons 
                        name={Platform.OS === 'ios'?'ios-happy-outline':'md-happy'}
                        size={100} 
                    />
                    <Text>You already logged your information for today</Text>
                    <TextButton 
                        style={{padding: 10}}
                        onPress={this.reset}
                    >Reset</TextButton>
                </View>
            )
        }

        return (
            <View style={styles.container}>
                <DateHeader date={new Date().toLocaleDateString()} />
                {Object.keys(metaInfo).map((key) => {
                    const { getIcon, type, ...rest } = metaInfo[key]
                    const value = this.state[key]
                    return (
                        <View key={key} style={styles.row}>
                            {getIcon()}
                            {type === 'slider' ? (
                                <UdaciSlider
                                    value={value}
                                    onChange={(value) =>
                                        this.slider(key, value)
                                    }
                                    {...rest}
                                />
                            ) : (
                                <UdaciStepper
                                    value={value}
                                    onIncrement={() => this.increment(key)}
                                    onDecrement={() => this.decrement(key)}
                                    {...rest}
                                />
                            )}
                        </View>
                    )
                })}
                <SubmitBtn onPress={this.submit} />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: white
    },
    row: {
        flexDirection: 'row',
        flex: 1,
        alignItems: 'center'
    },
    iosSubmitBtn: {
        backgroundColor: purple,
        padding: 10,
        borderRadius: 7,
        height: 45,
        marginLeft: 40,
        marginRight: 40
    },
    androidSubmitBtn: {
        backgroundColor: purple,
        padding: 10,
        paddingLeft: 30,
        paddingRight: 30,
        borderRadius: 2,
        height: 45,
        alignSelf: 'flex-end',
        justifyContent: 'center',
        alignItems: 'center'
    },
    submitBtnText: {
        color: white,
        fontSize: 22,
        textAlign: 'center',

    },
    center: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: 30,
        marginRight: 30
    }
})

const mapStateToProps = (state) => {
    const key = timeToString()
    return {
        alreadyLogged: state[key] && typeof state[key].today === 'undefined'
    }
}

const mapDispatchToProps = {
    addEntry
}

export default connect(mapStateToProps, mapDispatchToProps)(AddEntry)
