/**
 * Created by ssoudan on 9/8/15.
 */
import {
    default as React,
    Component,
} from "react";

import {
    default as HeatmapCreator,
    heatmapDefaultPropTypes,
    heatmapControlledPropTypes,
    heatmapEventPropTypes,
} from "./creators/HeatmapCreator";

export default class Heatmap extends Component {
    static propTypes = {
        // Uncontrolled default[props] - used only in componentDidMount
        ...heatmapDefaultPropTypes,
        // Controlled [props] - used in componentDidMount/componentDidUpdate
        ...heatmapControlledPropTypes,
        // Event [onEventName]
        ...heatmapEventPropTypes,
    }

    // Public APIs
    //
    // https://developers.google.com/maps/documentation/javascript/3.exp/reference#Heatmap
    //
    // [].map.call($0.querySelectorAll("tr>td>code"), function(it){ return it.textContent; }).filter(function(it){ return it.match(/^get/) && !it.match(/^getMap/); })
    getData () { return this.state.heatmap.getData(); }
    // END - Public APIs
    //
    // https://developers.google.com/maps/documentation/javascript/3.exp/reference#Heatmap

    state = {
    }

    componentDidMount () {
        const {mapHolderRef, ...heatmapProps} = this.props;
        const heatmap = HeatmapCreator._createHeatmap(mapHolderRef, heatmapProps);

        this.setState({ heatmap });
    }

    render () {
        if (this.state.heatmap) {
            return (
                <HeatmapCreator heatmap={this.state.heatmap} {...this.props}>
                    {this.props.children}
                </HeatmapCreator>
            );
        } else {
            return (<noscript />);
        }
    }
}
