import React from 'react'
import { Text, TouchableOpacity, StyleSheet } from 'react-native'
import PropTypes from 'prop-types'
import { purple } from '../utils/colors'

const TextButton = ({ children, onPress, style = {} }) => (
    <TouchableOpacity onPress={onPress}>
        <Text style={[styles.reset, style]}>{children}</Text>
    </TouchableOpacity>
)


const styles = StyleSheet.create({
    reset: {
        textAlign: 'center',
        color: purple
    }
})

TextButton.propTypes = {
}

TextButton.defaultProps = {
}

export default TextButton