import React, { Component } from 'react'
import { View } from 'react-native'
import AddEntry from './components/AddEntry'
import History from './components/History'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import reducer from './reducers'

class App extends Component {
    store = createStore(reducer)
    render() {
        return (
            <Provider store={this.store}>
                <View style={{ flex: 1 }}>
                    <History />
                </View>
            </Provider>
        )
    }
}

export default App