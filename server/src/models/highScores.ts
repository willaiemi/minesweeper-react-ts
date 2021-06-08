import mongoose from "mongoose"

interface IHighScore {
    username: string;
    difficulty: number;
    timer: number;
    bombsFlagged: number;
}

interface HighScoreDocument extends mongoose.Document, IHighScore {}

interface HighScoreModel extends mongoose.Model<HighScoreDocument> {
    build(attributes: IHighScore): HighScoreDocument;
}


const highScoreSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
    },
    difficulty: {
        type: Number,
        required: true,
    },
    timer: {
        type: Number,
        required: true,
    },
    bombsFlagged: {
        type: Number,
        required: true,
    }
})

highScoreSchema.statics.build = (attributes: IHighScore) => {
    return new HighScore(attributes)
}

const HighScore = mongoose.model<any, HighScoreModel>('HighScore', highScoreSchema)

export { HighScore }

HighScore.build({
    username: "Aaa",
    difficulty: 0,
    timer: 60,
    bombsFlagged: 20,
})
