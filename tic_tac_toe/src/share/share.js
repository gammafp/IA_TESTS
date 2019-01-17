const db = {
    jugadorActual: 'cero',
    partidaActual: [
        [-1, -1, -1],
        [-1, -1, -1],
        [-1, -1, -1]
    ]
};

const restartDB = () => {
    db.partidaActual = [
            [-1, -1, -1],
            [-1, -1, -1],
            [-1, -1, -1]
        ]
}

export default {db, restartDB};