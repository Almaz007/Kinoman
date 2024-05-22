// import pool from "../db.js";

class UserRepository {
	static async createUser({ userName, hashedPassword, role }) {
		let response = await pool.query(
			`INSERT INTO users(name, password, role)
      VALUES ($1, $2, $3) RETURNING *`,
			[userName, hashedPassword, role]
		)
		return response.rows[0]
	}

	static async getUserData(userName) {
		let response = await pool.query(
			'SELECT * FROM public.users WHERE name = $1',
			[userName]
		)

		if (!response.rows.length) {
			return null
		}

		return response.rows[0]
	}
}

export default UserRepository
