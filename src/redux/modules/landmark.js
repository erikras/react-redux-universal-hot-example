const REQUEST_LANDMARK = 'explore-msd/landmarks/REQUEST_LANDMARK';
export const RECEIVE_LANDMARK = 'RECEIVE_LANDMARK'

export function requestLandmark(id) {
  return { 
    type: REQUEST_LANDMARK, 
    id 
  };
}

export function receiveLandmark(id, json) {
  return {
    type: RECEIVE_POSTS,
    id,
    landmark: json
    receivedAt: Date.now()
  }
}