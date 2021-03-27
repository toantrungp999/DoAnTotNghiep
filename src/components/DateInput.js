import React from 'react'
import { View, StyleSheet, Text } from 'react-native';
import { theme } from '../core/theme';
import DatePicker from 'react-native-datepicker';

const DateInput = ({ errorText, description, ...props }) => (
    <View style={styles.container}>
        <DatePicker
            style={styles.input}
            date={props.value} // Initial date from state
            mode="date" // The enum of date, datetime and time
            format="DD-MM-YYYY"
            minDate="01-01-1900"
            maxDate={new Date()}
            confirmBtnText="Xác nhận"
            cancelBtnText="Hủy"
            customStyles={{
                dateIcon: {
                    //display: 'none',
                    position: 'absolute',
                    left: 0,
                    top: 4,
                    marginLeft: 0,
                },
                dateInput: {
                    marginLeft: 36,
                },
            }}
            //   onDateChange={(date) => {
            //     setDate(date);
            //   }}
            {...props}
        />
        {description && !errorText ? (
            <Text style={styles.description}>{description}</Text>
        ) : null}
        {errorText ? <Text style={styles.error}>{errorText}</Text> : null}
    </View>
)

const styles = StyleSheet.create({
    container: {
        width: '100%',
        marginVertical: 12,
        borderWidth: 0,
    },
    input: {
        backgroundColor: theme.colors.surface,
    },
    description: {
        fontSize: 13,
        color: theme.colors.secondary,
        paddingTop: 8,
    },
    error: {
        fontSize: 13,
        color: theme.colors.error,
        paddingTop: 8,
    },
})

export default DateInput
