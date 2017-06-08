import React from 'react';
import propTypes from 'prop-types';

import UIComponent from '../UIComponent';
import Window from '../../core/Window';
import { events } from '../../core/Global';

export default class Reactor extends UIComponent {
    constructor(props, context) {
        super(props);

        this.app = context.app;
    }

    render() {
        return (
            <div className="reactor">
                REACTOR
            </div>
        );
    }
}

Reactor.contextTypes = {
    app: propTypes.object
};