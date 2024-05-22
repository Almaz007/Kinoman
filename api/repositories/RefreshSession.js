// import pool from "../db.js";

class RefreshSessionRepository {
	static async getRefreshSession(refreshToken) {
		const result = await prisma.refreshToken.findMany({
			where: {
				refreshToken: refreshToken,
				rejectOnNotFound: false,
			},
		})

		if (!result) {
			return null
		}

		return result[0]
	}

	static async createRefreshSession({ id, refreshToken, fingerprint }) {
		await pool.query(
			`INSERT INTO refresh_sessions(user_id, refresh_token, finger_print)
      VALUES ($1, $2, $3)`,
			[id, refreshToken, fingerprint.hash]
		)
	}

	static async deleteRefreshSession(refreshToken) {
		await pool.query('DELETE FROM refresh_sessions WHERE refresh_token=$1', [
			refreshToken,
		])
	}
}

export default RefreshSessionRepository
