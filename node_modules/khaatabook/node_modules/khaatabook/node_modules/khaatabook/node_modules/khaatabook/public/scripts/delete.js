function delete_pop_up(delete_btn, fileName){
    var result = prompt("Do you want to delete?","Yes or No");
    if(result.toLocaleLowerCase() === 'yes'){
        var form = delete_btn.closest('form');
        form.action = `/delete/${fileName}`;
        form.submit();
    }else if (result.toLocaleLowerCase()==='no' || result == null) {
        window.location.reload();
    }else{
        alert("Incorrect input!!");
    }
    result = null;
}
