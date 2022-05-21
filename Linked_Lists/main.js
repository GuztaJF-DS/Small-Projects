function LinkedList(){

    let head=null;
    let length=0;

    const DisplayAll=()=>{
        if(head===null){
            return null
        }
        else{
            let arr=[];
            let current=head;

            for(var i=0;i<length;i++){
                arr[i]=current.value;
                current=current.next;
            }
            return arr;
        }
    }

    const DisplayAt=(index)=>{
        if(index>-1 && index<length){
            let current=head
            for(var i=0;i<index;i++){
                current=current.next
            }

            return current.value
        }
        else{
            return null
        }
    }

    const AddFirst=(value)=>{
        let node={
            value:value,
            next:head
        }

        head=node;
        length++;
    }

    const Add=(value,index)=>{
        if(index===0){
            AddFirst(value)
        }
        else if(index>-1 && index<=length){
            let node={
                value:value,
                next:null
            }

            let before;
            let current=head;
            let i=0;

            while(i++<index){
                before=current;
                current=current.next
            }

            before.next=node;
            node.next=current;

            length++;
        }
        else{
            alert("fora do alcance")
        }
    }

    const RemoveFirst=()=>{
       if(head===null){
        return null
       }
       else{
        let out=head;
        head=head.next

        if(length>0){
            length--
        }
        return out.head;
       }
    }

    const RemoveAt=(index)=>{
        if(index===0){
            RemoveFirst()
        }
        else if(index>-1 && index<length){
            let current=head
            let before;
            

            for(var i=0;i<index;i++){
                before=current;
                current=current.next;
            }

            before.next=current.next;
            length--    


            return current.value;
        }
        else{
            return null;
        }
    }

    return{
        Add:(value,index)=>Add(value,index),
        DisplayAll:()=>DisplayAll(),
        DisplayAt:(index)=>DisplayAt(index),
        RemoveFirst:()=>RemoveFirst(),
        RemoveAt:(index)=>RemoveAt(index)
    }
}

let List=LinkedList();
List.Add('FirstValue',0);
List.Add('SecondValue',1);
List.Add('ThirdValue',2);
console.log(List.DisplayAll());
List.Add('SecondValue2',1);
console.log(List.DisplayAll());
List.RemoveAt(1)
console.log(List.DisplayAll());


