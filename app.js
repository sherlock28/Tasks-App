$(document).ready(
    function () {

        let edit = false;
        $('#task-result').hide();
        fetchTasks();
    
        $('#search').keyup(function () {
            
            if($('#search').val()) {
             
                let search = $('#search').val();
                $.ajax({
                    url: 'task-search.php',
                    type: 'POST',
                    data: {search},
                    success: function (response) {
                        let tasks = JSON.parse(response);
                        let template = '';
                        tasks.forEach(elem => {
                            template += `<li>${elem.name}</li>`;
                        });
                        $('#task-result').show;
                        $('#container').html(template);
                    }
                });
            }
        })
    
        
        $('#task-form').submit(function (ev){
            const postData = {
                name: $('#task-name').val(),
                description: $('#task-description').val(),
                id: $('#task-id').val()
            };

            let url = edit === false ? 'task-add.php' : 'task-update.php';   
            console.log(url);
            
            $.post(url, postData, function (response) {
                console.log(response);
                fetchTasks();
                $('#task-form').trigger('reset');
            });
            ev.preventDefault();
        });
    
    
        function fetchTasks() {
            $.ajax({
                url: 'task-list.php',
                type: 'GET',
                success: function (response) {
                    let tasks = JSON.parse(response);
                    let template = '';
                    tasks.forEach(elem => {
                        template += `
                                    <tr taskId=${elem.id}>
                                    <td></td>
                                    <td>${elem.id}</td>
                                    <td><a href="#" class="task-item">${elem.name}</a></td>
                                    <td>${elem.description}</td>
                                    <td>
                                        <button class="task-delete btn btn-danger btn-sm">Delete</button>
                                    </td>
                                    </tr>
                                    `    
                    });
                    $('#row-tasks').html(template);
                }
            });
        }
    
        $(document).on('click', '.task-delete', function() {
            if(confirm('Are you sure you want to delete this task')) {
                let element = $(this)[0].parentElement.parentElement;
                let id = $(element).attr('taskId');
                $.post('task-delete.php', {id: id}, function(response) {
                    fetchTasks();
                });
            }
        });
    
        $(document).on('click', '.task-item', function () {
            let element = $(this)[0].parentElement.parentElement;
            let id = $(element).attr('taskId');
            $.post('task-single.php', {id}, function (response) {
                const task = JSON.parse(response);
                $('#task-name').val(task.name);
                $('#task-description').val(task.description);
                $('#task-id').val(task.id);
                edit = true;
            });
        });
    
    }
);


