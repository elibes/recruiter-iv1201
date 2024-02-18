import {PayloadAction} from '@reduxjs/toolkit';
import {ApplicationListState} from './applicationListSlice';

/**
 * Reducer for sorting the lists of applications.
 * */
export const sortingReducer = (
  state: ApplicationListState,
  action: PayloadAction<'a-z' | 'status'>
) => {
  switch (action.payload) {
    case 'a-z':
      state.applications.sort((a, b) => {
        const firstNameA = a.firstName.toUpperCase();
        const firstNameB = b.firstName.toUpperCase();

        if (firstNameA < firstNameB) {
          return -1;
        }
        if (firstNameA > firstNameB) {
          return 1;
        }
        return 0;
      });
      state.sorting = action.payload;
      break;
    case 'status':
      state.applications.sort((a, b) => {
        const statusOrder = {unhandled: 0, accepted: 1, rejected: 2};
        const statusA = statusOrder[a.status];
        const statusB = statusOrder[b.status];

        return statusA - statusB;
      });
      state.sorting = action.payload;
      break;
  }
};

/**
 * Reducer for setting the state of isLoaded, in the Application List slice.
 * */
export const isLoadedReducer = (
  state: ApplicationListState,
  action: PayloadAction<boolean>
) => {
  state.isLoaded = action.payload;
};

/**
 * Reducer for setting the state of applications, in the Application List slice. Uses the response
 * from the server after having requested applications. Instead sets error if the response states
 * that the request did not succeed.
 * */
export const getAllApplicationsReducer = (
  state: ApplicationListState,
  action: any
) => {
  if (!action.payload) return;
  if (action.payload.success) {
    state.applications = action.payload.applications;
  } else {
    state.error = [action.payload.error.message];
  }
};
