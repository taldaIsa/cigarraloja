import React, { Component } from "react"
import {View, Text, TextInput, StyleSheet, FlatList} from "react-native"
import { collection,addDoc, getDocs, doc, query,where,updateDoc, serverTimestamp,increment, limit } from "firebase/firestore";
import db from "../bancodedados.js"
import { ListItem, Icon } from "react-native-elements";

export default class Pesquisa extends Component{
  constructor(){
  super()
  this.state = {
  transaçoes: []
  }
  }

    
    render(){
        return(
            <View style = {styles.container}>
                <FlatList data = {this.state.transaçoes}
                renderItem = {this.renderItem}
                keyExtractor={(item, index) => index.toString()}></FlatList>
            </View>
        )

    }

    renderItem = ({item}) => {
    var pedido = item 
    var data = pedido.data.data.toDate().toString().split(" ").slice(0,5).join(" ")
    return(
    <View style = {{borderWidth:2}}>
      <ListItem key = {pedido.id}bottomDivider>
      <Icon name = {"shopping-cart"}></Icon>
      <ListItem.Content>
      <ListItem.Title
      style = {{fontWeight:"bold"}}>
      <Text>{pedido.data.nomeCliente} {pedido.data.sobrenome}</Text>
      </ListItem.Title>
      <Text>{pedido.data.nomeProduto}</Text>
      <Text>{data}</Text>
      </ListItem.Content>
      </ListItem>
    </View>
    )
    }

    pegartransaçoes = async () => {
    const procurar = query(collection(db,"Transação"))
    const resposta = await(getDocs(procurar));
    
    if(!resposta.empty){
    var quantodb = []
    resposta.docs.map((transaçao)=>{
    quantodb.push({id:transaçao.id,data:transaçao.data()})
    })

    this.setState({
    transaçoes: quantodb
    })
    }
}

componentDidMount = async () => {
this.pegartransaçoes()
}

}
const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: "#3F493E"
    }
})

