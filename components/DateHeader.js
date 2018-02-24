import React from 'react'
import PropTypes from 'prop-types'
import { Text } from 'react-native'
import { purple } from '../utils/colors'

const DateHeader = ({ date }) => (
    <Text style={{ color: purple, fontSize: 25 }}>{date}</Text>
)

DateHeader.propTypes = {
}

DateHeader.defaultProps = {
}

export default DateHeader