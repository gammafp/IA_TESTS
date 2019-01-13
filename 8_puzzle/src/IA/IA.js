import helpers from "./helpers.js";
import generatePos from "./generatorPos.js";

class IA {

    find(state, callback) {
        this.DB = [];
        this.nivel = 0;
        this.maxNivel = 40;
        // Comprueba si ya se ha creado el nodo
        this.existe = false;
        this.ruta = [];
    
        this.board = {
            board: R.clone(state),
            id: 0,
            parent: 0,
            value: 8,
            mov: ''
        }

        while (true) {
            if (this.board.value === 0) {
                // fin, se ha encontrado
                this.ruta.push(this.board);
                break;
            }
            if (this.DB[this.nivel] === undefined || this.existe) {
                const newMovs = generatePos(this.board);
                const bestMov = helpers.bestMov(newMovs);
                this.board = bestMov;
                if (!this.existe) {
                    this.DB.push([]);
                }
                this.DB[this.nivel].push(...newMovs);
                this.nivel++;
            } else {
                const listaPeso = this.DB[this.nivel];
                const bestMov = helpers.bestMov(listaPeso);
                // Si ya se ha completado el nivel bajar un nivel más
                if (!bestMov) {
                    this.nivel++;
                } else {
                    this.board = bestMov;
                    this.existe = true;
                    this.nivel++;
                    // console.log(tablero.see)
                }
            }
            if (this.nivel >= this.maxNivel) {
                this.nivel = 0;
                this.existe = false;
            }
        }

        this.DB = R.flatten(this.DB);
        let findParentID = 1;
        while (findParentID && this.ruta[this.ruta.length - 1].parent !== 0) {
            const filtrado = this.DB.filter((x) => x.id === this.ruta[this.ruta.length - 1].parent);
            findParentID = filtrado[0].parent;
            this.ruta.push(...filtrado);
        }
        
        const fin = R.reverse(this.ruta.map((x) => x.mov));
        
        function* rutaFinal() {
            for(let i = 0; i < fin.length; i++){
                yield fin[i];
            }
        }
        callback(rutaFinal());

    }
}

export default IA;