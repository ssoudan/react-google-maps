/**
 * Created by ssoudan on 9/8/15.
 */
import {
    default as React,
    PropTypes,
    Component,
} from "react";

import {default as HeatmapEventList} from "../eventLists/HeatmapEventList";
import {default as eventHandlerCreator} from "../utils/eventHandlerCreator";
import {default as defaultPropsCreator} from "../utils/defaultPropsCreator";
import {default as composeOptions} from "../utils/composeOptions";
import {default as componentLifecycleDecorator} from "../utils/componentLifecycleDecorator";

import {default as GoogleMapHolder} from "./GoogleMapHolder";

export const heatmapControlledPropTypes  = {
// [].map.call($0.querySelectorAll("tr>td>code"), function(it){ return it.textContent; }).filter(function(it){ return it.match(/^set/) && !it.match(/^setMap/); })
// https://developers.google.com/maps/documentation/javascript/3.exp/reference#Heatmap
    options: PropTypes.object,
    data: PropTypes.any,
};

export const heatmapDefaultPropTypes = defaultPropsCreator(heatmapControlledPropTypes );

const heatmapUpdaters = {
    options   (options, component) { component.getHeatmap().setOptions(options); },
    data      (data, component) { component.getHeatmap().setData(data); },
};

const {eventPropTypes, registerEvents} = eventHandlerCreator(HeatmapEventList);

export const heatmapEventPropTypes = eventPropTypes;

@componentLifecycleDecorator({
    registerEvents,
    instanceMethodName: "getHeatmap",
    updaters: heatmapUpdaters,
})
export default class HeatmapCreator extends Component {

    static propTypes = {
        mapHolderRef: PropTypes.instanceOf(GoogleMapHolder).isRequired,
        heatmap: PropTypes.object.isRequired,
    }

    static _createHeatmap (mapHolderRef, heatmapProps) {
        // https://developers.google.com/maps/documentation/javascript/3.exp/reference#Heatmap
        const heatmap = new google.maps.visualization.HeatmapLayer(composeOptions(heatmapProps, [
            // https://developers.google.com/maps/documentation/javascript/3.exp/reference#HeatmapOptions
            "data",
        ]));

        heatmap.setMap(mapHolderRef.getMap());

        return heatmap;
    }

    getHeatmap () {
        return this.props.heatmap;
    }

    render () {
        return (<noscript />);
    }
}
