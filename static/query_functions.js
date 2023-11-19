var keysOrder = ['id', 'level', 'message', 'resourceId', 'timestamp', 'traceId', 'spanId', 'commit', 'metadata'];
const itemsPerPage = 20;

function applyFilters() {
    // Get filter values from the form
    var level = new RegExp('^' + document.getElementById('level').value, 'i');
    var message = new RegExp(document.getElementById('message').value, 'i');
    var resourceId = new RegExp('^' + document.getElementById('resourceId').value, 'i');
    var startDate = document.getElementById('startDate').value;
    var endDate = document.getElementById('endDate').value;
    var traceId = new RegExp('^' + document.getElementById('traceId').value, 'i');
    var spanId = new RegExp('^' + document.getElementById('spanId').value, 'i');
    var commit = new RegExp('^' + document.getElementById('commit').value, 'i');
    var parentResourceId = new RegExp('^' + document.getElementById('parentResourceId').value, 'i');

    // Filter logs based on the input values
    var filteredLogs = logsData.filter(log =>
        (!level || level.test(log.level)) &&
        (!message || message.test(log.message)) &&
        (!resourceId || resourceId.test(log.resourceId)) &&
        (!startDate || log.timestamp >= startDate) &&
        (!endDate || log.timestamp <= endDate) &&
        (!traceId || traceId.test(log.traceId)) &&
        (!spanId || spanId.test(log.spanId)) &&
        (!commit || commit.test(log.commit)) &&
        (!parentResourceId || parentResourceId.test(log.parentResourceId))
    );

    // Display filtered logs
    filteredLogs.length > 0 ? paginate(filteredLogs) : emptyFilteredLogs();
}

function paginate(items) {
    let currentPage = 1;
    const totalPages = Math.ceil(items.length / itemsPerPage);
    const pagination = document.getElementById("paginationContainer");
    pagination.innerHTML = "";

    function showItems(page) {
        const startIndex = (page - 1) * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;
        const pageItems = items.slice(startIndex, endIndex);
        const itemsContainer = document.getElementById("filteredLogsContainer");
        let counter = 1;

        // Clear previous filtered logs
        itemsContainer.innerHTML = '';

        var headerElement = document.createElement('h4');
        headerElement.textContent = 'Total number of logs found: ' +  items.length ;
        itemsContainer.appendChild(headerElement);

        pageItems.forEach((item) => {
            var jsonResponse = {}
            keysOrder.forEach(function (property) {
                jsonResponse[property] = item[property];
            });
            var prettyJson = JSON.stringify(jsonResponse, null, 2);

            var counterElement = document.createElement('div');
            counterElement.textContent = (currentPage-1)*20 + counter + ')';
            counter++;

            var jsonElement = document.createElement('pre');
            jsonElement.className = 'jsonOutput';
            jsonElement.textContent = prettyJson;

            counterElement.appendChild(jsonElement);
            itemsContainer.appendChild(counterElement);

            var hrElement = document.createElement('hr');
            hrElement.className = 'jsonHr';
            itemsContainer.appendChild(hrElement);
        });
    }

    function setupPagination() {

        for (let i = 1; i <= totalPages; i++) {
            const link = document.createElement("a");
            link.href = "#";
            link.innerText = i;

            if (i === currentPage) {
                link.classList.add("active");
            }

            link.addEventListener("click", (event) => {
                event.preventDefault();
                currentPage = i;
                showItems(currentPage);

                const currentActive = pagination.querySelector(".active");
                currentActive.classList.remove("active");
                link.classList.add("active");
            });

            pagination.appendChild(link);
        }
    }

    showItems(currentPage);
    setupPagination();
}

// Default display of all logs
paginate(logsData);

function clearFilters() {
    // Clear filter input values
    document.getElementById('level').value = '';
    document.getElementById('message').value = '';
    document.getElementById('resourceId').value = '';
    document.getElementById('startDate').value = '';
    document.getElementById('endDate').value = '';
    document.getElementById('traceId').value = '';
    document.getElementById('spanId').value = '';
    document.getElementById('commit').value = '';
    document.getElementById('parentResourceId').value = '';

    // Display all logs
    paginate(logsData);
}

function emptyFilteredLogs() {
    document.getElementById('filteredLogsContainer').innerHTML = '';
    var emptyElement = document.createElement('h2');
    emptyElement.textContent = "No matching logs found!"
    document.getElementById('filteredLogsContainer').appendChild(emptyElement);
}

function handleKeyPress(event) {
    if (event.key === 'Enter') {
        applyFilters();
    }
}

// Attach the keypress event listener to each input field
document.getElementById('level').addEventListener('keypress', handleKeyPress);
document.getElementById('message').addEventListener('keypress', handleKeyPress);
document.getElementById('resourceId').addEventListener('keypress', handleKeyPress);
document.getElementById('startDate').addEventListener('keypress', handleKeyPress);
document.getElementById('endDate').addEventListener('keypress', handleKeyPress);
document.getElementById('traceId').addEventListener('keypress', handleKeyPress);
document.getElementById('spanId').addEventListener('keypress', handleKeyPress);
document.getElementById('commit').addEventListener('keypress', handleKeyPress);
document.getElementById('parentResourceId').addEventListener('keypress', handleKeyPress);
