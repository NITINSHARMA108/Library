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

displayform.addEventListener('click',function(){
    console.log(displayform);
    if(document.getElementById('modal').style.display=='block')
    {
        document.getElementById('modal').style.display='none'
    }
    else{
    document.getElementById('modal').style.display='block';
    }

})

createrecord.addEventListener('click',function(){
    let title=document.getElementById('title').value;
    let author=document.getElementById('author').value;
    let pages=document.getElementById('pages').value;
    let status=readstatus;
    readstatus='false';
    let newbook=new books(title,author,pages,status);
    addbook(title,author,pages,status);
    
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
            let divchild=document.createElement('div');
            let text=document.createTextNode(`${key.toUpperCase()} : ${(book[key]).toLowerCase()}`);
            divchild.appendChild(text);
            divparent.append(divchild);
        }
        let delet=document.createElement('i');
        let edit=document.createElement('i');
        delet.setAttribute('class',`fas fa-trash`);
        delet.setAttribute('id',`${book.title}`);
        
                delet.addEventListener('click',function(){
                
                let title=this.id;
                library=library.filter((b)=>b.title!=title);
                localStorage.removeItem('records');
                localStorage.setItem('records',JSON.stringify(library));
                displayLibrary();
                })
        edit.setAttribute('class','fas fa-edit');
        edit.setAttribute('id',`${book.name}_`);
                edit.addEventListener('click',function(){
                        
                    let title=this.id;
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
        divparent.append(delet);

        divparent.append(edit);


        document.getElementById('books').append(divparent);
    })
}
displayLibrary();

//books array

