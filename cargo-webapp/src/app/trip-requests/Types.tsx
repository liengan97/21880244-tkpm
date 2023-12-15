
export enum CargoEventStatus {
  OK = 'OK',
  DONE = 'DONE',
  INPROGRESS = 'INPROGRESS'
}

export enum CargoEvent {
  FIND_DRIVER = 'FIND_DRIVER',
  FOUND_DRIVER = 'FOUND_DRIVER',
  NO_APP_USER_FIND_DRIVER = 'NO_APP_USER_FIND_DRIVER'
}

export type CargoBasicEventMessage = {
  status: CargoEventStatus,
  message: string
}