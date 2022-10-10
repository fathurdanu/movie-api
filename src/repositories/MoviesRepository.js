const admin = require("firebase-admin");
const serviceAccount = require(process.env.FIREBASE_SERVICE_ACCOUNT_KEY_PATH);


class MoviesRepository {

    constructor() {
        admin.initializeApp({
            credential: admin.credential.cert(serviceAccount)
        });
        this.db = admin.firestore();
        this.collection = "movies"
    }

    async getById(id) {

        let moviesRef = this.db.collection(this.collection).doc(id)
        const response = await moviesRef.get();

        if (response.empty) {
            return null;
        }

        return response.data();
    }

    async getBySeriesTitle(seriesTitle) {
        let moviesRef = this.db.collection(this.collection).where('seriesTitle', '==', seriesTitle).limit(1);
        const response = await moviesRef.get();
        if (response.empty) {
            return null;
        }
        return response.docs[0].id;
    }

    async create(data) {
        const response = await this.db.collection(this.collection).add(data);
        if (response.empty) {
            return null;
        }
        return response;
    }

    async update(id, data) {
        await this.db.collection(this.collection).doc(id).update(data);
    }

    async delete(id) {
        await this.db.collection(this.collection).doc(id).delete()
    }

    async getMany(limit, after, before) {

        let moviesRef = this.db.collection("movies")
            .orderBy('seriesTitle', 'asc');

        if (after) {
            moviesRef = moviesRef.startAfter(after).limit(limit);
        } else if (before) {
            moviesRef = moviesRef.endBefore(before).limitToLast(limit);
        } else {
            moviesRef = moviesRef.limit(limit)
        }

        const response = await moviesRef.get();
        const responseArr = this.firebaseResponseToArray(response);

        const data = {
            records: responseArr,
            pagination: {
                prev: responseArr.length > 0 && (after || before) ? responseArr[0]["seriesTitle"].replaceAll(" ", "%20") : null,
                next: responseArr.length == limit ? responseArr[responseArr.length - 1]["seriesTitle"].replaceAll(" ", "%20") : null,
            }
        }

        return data;
    }

    firebaseResponseToArray(response) {
        return response.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    }

}

module.exports = new MoviesRepository();