import {db} from "../firebase/config";
import { v4 as uuidv4 } from 'uuid';
import { collection, getDocs, addDoc, deleteDoc, doc} from "firebase/firestore";

let itemList = [] //This is for displaying the items
const objList = [] //this is the objects themselves. I needed two lists because I couldn't pass variables between files like I wanted with js
let i = 1;
let size = 0;

export function InventoryItem(name, ExpirationDate, ReminderDate, Description, Category) {

    this.Name = name;
    this.ExpirationDate = ExpirationDate;
    this.ReminderDate = ReminderDate;
    this.Description = Description;
    this.Category = Category;
    this.id = uuidv4();

    objList.push(this); //Add to list of objects
    //itemList.push(this);

    addDataToDB(this.id, name, ExpirationDate, ReminderDate, Description, Category) //Add to DataBase
}

export async function ItemList(newItem){
    let item = newItem;

    itemList.push({Name: item.Name, id: item.id, ReminderDate: item.ReminderDate, ExpirationDate: item.ExpirationDate, Description: item.Description, Category: item.Category});

    i += 1;

}

export function getItemList(){
    return itemList;
}

export function getItem(id){

    for(var i = 0; i < objList.length; i++){
        console.log(objList[i].Name)
        if(objList[i].id == id){
            console.log("found");
            console.log("obj: ", objList[i]);
            return objList[i];   
        }
    }

}

const addDataToDB = async (id, name, ExpirationDate, ReminderDate, Description, Category ) => {

    const itemRef = collection(db, "Items")

    const payload = {id, Name: name, ExpirationDate: ExpirationDate, ReminderDate: ReminderDate, Description: Description, Category: Category}

    await addDoc(itemRef, payload)

    alert("Item Successfully Added")
}

export const getDataFromDB = async () => {

    const querySnapshot = await getDocs(collection(db, "Items"));
    querySnapshot.forEach((doc) => {

    ItemList(doc.data())

  });
}

export const deleteDataFromDB = async (id) => {

    const querySnapshot = await getDocs(collection(db, "Items"));
    querySnapshot.forEach((doc) => {
        if(doc.data().id == id){
            deleteItem(doc);
        }
  });
}

const deleteItem = (item) => {
    const ref = doc(db, "Items", item.id)
    deleteDoc(ref);
}

export function editItem(item, newName, newExpiration, newReminder, newDescription, newCategory){
    item.Name = newName;
    item.ExpirationDate = newExpiration;
    item.ReminderDate = newReminder;
    item.Description = newDescription;
    item.Category = newCategory;

    alert("Item Successfully Edited");
}