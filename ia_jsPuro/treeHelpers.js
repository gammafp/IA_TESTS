"use strict";

class Node{
    constructor(data){
        this.data = data;
        this.left = null;
        this.right = null;
    }
}

class Tree{
    constructor(){
        this.root = null;
    }

    //Función para insertar un nodo en el árbol
    insert(data){
        var newNode = new Node(data);

        if(this.root === null){
            this.root = newNode;
        }
        else{
            this.insertNode(this.root, newNode);
        }
    };

    //Función para insertar un nodo dentro del árbol
    insertNode(node, newNode){
        if(Math.floor(Math.random()*2)){
            if(node.right === null){
                node.right = newNode;
            }
            else{
                this.insertNode(node.right, newNode);
            }
        }
        else{
            if(node.left === null){
                node.left = newNode;
            }
            else{
                this.insertNode(node.left,newNode);
            }
        }    
    };
}

function generar(gTree){
    for(let i=0; i<10; i++){
        gTree.insert(Math.floor(Math.random*50));
    }
}

export default {
    Node,
    Tree,
    generar
};
