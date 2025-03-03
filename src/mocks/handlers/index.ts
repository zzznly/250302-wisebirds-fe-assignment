import { getCampaignListHandler } from './campaigns/getCampaignListHandler';
import { updateCampaignHandler } from './campaigns/updateCampaignHandler';
import { getUserInfoHandler } from './user/getUserInfoHandler';
import { getUserListHandler } from './user/getUserListHandler';
import { createUserInfoHandler } from './user/createUserInfoHandler';
import { updateUserInfoHandler } from './user/updateUserInfoHandler';
import { checkUserEmailHandler } from './user/checkUserEmailHandler';

export const handlers = [
  getUserInfoHandler,
  getUserListHandler,
  createUserInfoHandler,
  updateUserInfoHandler,
  checkUserEmailHandler,
  getCampaignListHandler,
  updateCampaignHandler,
];
