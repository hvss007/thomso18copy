import React, { Component } from 'react';
import Select from 'react-select';

import FetchApi from "../../../utils/FetchAPI";

const customStyles = {
    option: (base, state) => ({
        ...base,
        borderBottom: '1px solid black',
        color: 'black',
        padding: 10,
    }),
    control: () => ({
        width: '100%',
        display: 'flex',
        borderBottom: '#BEBEBE 2px solid',
    }),
    input: (base) => ({
        ...base,
        marginTop: '3px',
        paddingTop: '5px',
        color: 'white',
        fontSize: '14px',
        overflow: 'hidden'
    }),
    menuList: (base) => ({
        ...base,
        height: '20vh'
    }),
    dropdownIndicator: (base) => ({
        ...base,
        fontWeight: '600',
        color: 'white',
    }),
    clearIndicator: () => ({
        fontWeight: '600',
        color: 'white'
    }),
    placeholder: (base) => ({
        ...base,
        fontSize: '14px',
        color: 'white',
        fontWeight: '600',
    }),
    valueContainer: (base) => ({
        ...base,
        color: 'white',
        fontWeight: '600',
        opacity: '0.8',
        width: 'calc(100% - 40px)',
    }),
    singleValue: (base, state) => {
        const opacity = state.isDisabled ? 0.5 : 1;
        return {
            ...base,
            opacity,
            transition: 'opacity 300ms',
            color: 'white',
            fontWeight: '400',
            fontSize: '14px'
        };
    }
}

export default class Primary_eventsSelect extends Component {
    constructor() {
        super();
        this.state = {
            events: []
        }
    }

    componentWillMount() {
        FetchApi('GET', '/api/main/primary')
            .then(res => {
                if (res && res.data && res.data.success === true && res.data.body && res.data.body.length > 0) {
                    const events = res.data.body.map(event => ({
                        value: event._id,
                        label: event.name,
                    }));
                    this.setState({ events: events })
                }
            })
            .catch(e => {
                console.log(e)
            });
    }

    handleChange = (newValue) => {
        if (newValue && newValue.value) {
            this.props.onChange(newValue.value);
        }
    };

    render() {
        return (
            <Select
                styles={customStyles}
                isClearable
                onChange={this.handleChange}
                options={this.state.events}
            />
        );
    }
}
