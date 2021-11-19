import { LOCAL_STORAGE_KEY } from "../workers";

export const useGetStunts = () => {
  try {
    let stunts = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (!stunts) throw new Error("no stunts");

    stunts = JSON.parse(stunts);
    const filteredStunts = stunts.filter((stunt) => stunt.approved === true);

    return filteredStunts;
  } catch (error) {
    return [];
  }
};
