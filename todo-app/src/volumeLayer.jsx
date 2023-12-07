import React, {createContext, useContext, useReducer} from 'react';

export const VolumeLayerContext = createContext();

export const VolumeLayer = ({initialState, reducer, children}) => (
    <VolumeLayerContext.Provider value={useReducer(reducer, initialState)}>
        {children}
    </VolumeLayerContext.Provider>
);

export const useVolumeLayerValue = () => useContext(VolumeLayerContext);