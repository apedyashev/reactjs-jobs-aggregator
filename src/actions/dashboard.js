import {action} from 'helpers/actions';

export const LOAD_DASHBOARD_PAGE = 'LOAD_DASHBOARD_PAGE';

export const loadDashboardPage = () => {
  return action(LOAD_DASHBOARD_PAGE);
};
