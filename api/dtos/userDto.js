export default class UserDto {
	id
	userName
	email
	phoneNumber
	roleId

	constructor(model) {
		this.id = model.id
		this.email = model.email
		this.userName = model.userName
		this.phoneNumber = model.phoneNumber
		this.roleId = model.roleId
	}
}
