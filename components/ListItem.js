import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableHighlight, Image } from 'react-native';
import { Badge, Card } from 'react-native-elements';

var lib = require("../util/dateFormat.js");

/**
 * Renders each item in the list
 * 
 * @export
 * @class ListItem
 * @extends {Component}
 */
export default class ListItem extends Component {
    /**
     * Creates an instance of ListItem.
     * @param {any} props 
     * @memberof ListItem
     */
    constructor(props) {
        super(props);
    }

    /**
     * Convert creation date
     * 
     * @param {any} dateInput 
     * @returns 
     * @memberof ListItem
     */
    formatDate(dateInput) {
        return lib.getCreationDate(dateInput);
    }


    /**
     * Render  component
     * 
     * @returns 
     * @memberof ListItem
     */
    render() {
        return (
            <TouchableHighlight onPress={this.props.onPress}>
                <View style={{ flex: 1, flexDirection: 'column', padding: 10 }}>
                    <View style={{ height: 120, flexDirection: 'row' }}>
                        <Image
                            style={{ height: 120, width: 120 }}
                            source={{ uri: this.props.item.data.thumbnail }}
                        />
                        <View style={{ flex: 1, flexDirection: 'column' }}>
                            <View style={{ flex: 1, flexDirection: 'row' }}>
                                <View style={{ flex: 1 }}>
                                </View>
                                <View style={{ flex: 2 }}>
                                    <Text >{this.formatDate(this.props.item.data.created)}</Text>
                                </View>
                            </View>
                            <View style={{ flex: 3, padding: 5 }}>
                                <Text numberOfLines={4} >{this.props.item.data.title}</Text>
                            </View>
                            <View style={{ flex: 1, flexDirection: 'row' }}>
                                <View style={{ flex: 3, padding: 5, backgroundColor: '#E8E8E8' }}>
                                    <Text >{this.props.item.data.author}</Text>
                                </View>
                                <View style={{ flex: 1, padding: 2 }}>
                                    <Badge
                                        value={this.props.item.data.score}
                                        textStyle={{ color: 'white' }}
                                    />
                                </View>
                                <View style={{ flex: 1, padding: 2 }}>
                                    <Badge
                                        value={this.props.item.data.num_comments}
                                        textStyle={{ color: 'white' }}
                                    />
                                </View>
                            </View>
                        </View>
                    </View>
                </View>
            </TouchableHighlight>
        );
    }
}

