import { AsyncStorage } from 'react-native'
import { formatCalendarResults, CALENDAR_STORAGE_KEY } from './_calendar'

export const fetchCalendarResults = () => (
    AsyncStorage.getItem(CALENDAR_STORAGE_KEY).then(
        formatCalendarResults
    )
)

export const submitEntry = ({ entry, key }) =>
    AsyncStorage.mergeItem(
        CALENDAR_STORAGE_KEY,
        JSON.stringify({
            [key]: entry
        })
    )

export const removeEntry = (key) =>
    AsyncStorage.getItem(CALENDAR_STORAGE_KEY).then((result) => {
        const data = JSON.parse(result)
        data[key] = undefined
        delete data[key]
        AsyncStorage.setItem(CALENDAR_STORAGE_KEY, JSON.stringify(data))
    })
