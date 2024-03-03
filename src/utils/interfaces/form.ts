export interface ActionForm {
  type: Action;
  value: string;
}

export enum Action {
  changeUsername = "ch_username",
  changeName = "ch_name",
  changeLastname = "ch_lastname",
  changeEmail = "ch_email",
  changePassword = "ch_pass",
}

export interface Form {
  username: string;
  name: string;
  lastname: string;
  email: string;
  password: string;
}
