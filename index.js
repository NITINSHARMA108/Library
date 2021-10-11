let displayform=document.getElementById('addrecord');
let createrecord=document.getElementById('createrecord');
let library=[];
let readstatus='false';
let getStatus=document.getElementById('status');


getStatus.addEventListener('click',function(){
    readstatus='true';
})
//localStorage.removeItem('records');
if(localStorage.getItem('records')!=null)
{
    console.log(localStorage.getItem('records'));
    library=JSON.parse(localStorage.getItem('records'));
}

//close modal
document.getElementById('times').addEventListener('click',function(){
    document.getElementById('modal').style.display='none';
})

displayform.addEventListener('click',function(){
    console.log(displayform);
    if(document.getElementById('modal').style.display=='block')
    {
        document.getElementById('modal').style.display='none';
    }
    else{
    document.getElementById('modal').style.display='block';
    }

})

createrecord.addEventListener('click',function(){
    let title=document.getElementById('title').value;
    let author=document.getElementById('author').value;
    let pages=document.getElementById('pages').value;
    if(title=='' || author=='' || pages==0)
    {
        window.alert('incomplete information');
        return ;
    }
    let status=readstatus;
    readstatus='false';
    let newbook=new books(title,author,pages,status);
    addbook(title,author,pages,status);
    document.getElementById('title').value="";
    document.getElementById('author').value="";
    document.getElementById('pages').value="";
    document.querySelector("input[type='radio'][name='status']").checked=false;
    
    document.getElementById('modal').style.display='none';
    displayLibrary();
    localStorage.removeItem('records');
    localStorage.setItem('records',JSON.stringify(library));


})


function books(title,author,pages,status)
{
    this.title=title;
    this.author=author;
    this.pages=pages;
    this.status=status;
}

books.prototype.changestatus=function(){
    this.status=!this.status;
}


function addbook(title,author,pages,status){
    //console.log(typeof(library));
    library.push({title:title,author:author,pages:pages,status:status});
}

function displayLibrary(){
    let length=library.length;
    document.getElementById('books').innerHTML='';
    library.map((book)=>{
        let divparent=document.createElement('div');
        divparent.setAttribute('class','card');
        for(key in book)
        {
            if(key=='title')
            {
                let divchild=document.createElement('h2');
                let text=document.createTextNode(`${book[key]}`);
                divchild.setAttribute('class','title');
                divchild.appendChild(text); 
                divparent.append(divchild);
            }
            else
            {
                let divchild=document.createElement('div');
                if(key=='status')
                {
                    if(book[key]=='true')
                    {
                        let text=document.createTextNode(`${key.toUpperCase()} : Read`);
                        divchild.appendChild(text);
                    }
                    else{
                        let text=document.createTextNode(`${key.toUpperCase()} : Not Read`);
                        divchild.appendChild(text);
                    }
                }
                else{
                let text=document.createTextNode(`${key.toUpperCase()} : ${(book[key]).toLowerCase()}`);
                divchild.appendChild(text);
                }
                divparent.append(divchild);
            }
            
        }
        let delet=document.createElement('button');
        let textnode1=document.createTextNode('Delete');
        delet.appendChild(textnode1);
        
        let edit=document.createElement('button');
        if(book.status=='true')
        {
            let textnode2=document.createTextNode('Unread');
            edit.appendChild(textnode2);
        }
        else{
            let textnode2=document.createTextNode('Read');
            edit.appendChild(textnode2); 
        }
        
        delet.setAttribute('data',`${book.title}`);
        
                delet.addEventListener('click',function(){
                
                let title=this.getAttribute('data');
                library=library.filter((b)=>b.title!=title);
                localStorage.removeItem('records');
                localStorage.setItem('records',JSON.stringify(library));
                displayLibrary();
                })
        //edit.setAttribute('class','fas fa-edit');
        //console.log(book.name);
        edit.setAttribute('data',`${book.title}_`);
                edit.addEventListener('click',function(){
                        console.log(this)
                    let title=this.getAttribute('data');
                    console.log(title)
                    library=library.map((b)=>{
                        if((b.title+'_')==title)
                        {
                            if(b.status=='false')
                            {
                                b.status='true'
                            }
                            else{
                                b.status='false';
                            }
                        }
                        return b;
                    });
                    localStorage.removeItem('records');
                    localStorage.setItem('records',JSON.stringify(library));
                    displayLibrary();
                    })
        divparent.append(edit);
        divparent.append(delet);

        


        document.getElementById('books').append(divparent);
    })
}
displayLibrary();

//books array

