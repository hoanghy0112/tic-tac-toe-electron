import { configureStore } from '@reduxjs/toolkit';
import configurationSlice from 'renderer/features/configuration';

export default configureStore({
	reducer: {
		configuration: configurationSlice,
	},
});
