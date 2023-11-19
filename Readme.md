<a name="readme-top"></a>
# Log Ingestor 

---
## Description

---
Log Ingestor is a Flask Application made to display paginated logs stored in SQLite database to the user along with some cool filters based on fields of a `log`. It provides smooth user interface with quick search results functionality. Do check it out and put a star if you like it so that it can get a wider reach.

| 🗺 Routes 🗺 | 🔡 Method 🔡 |    🚧 Usage 🚧    |
|:------------:|:------------:|:-----------------:|
|   `/query`   |     Get      | To retrieve logs. | 
|  `/ingest`   |     Post     | To ingest logs in database|


### Built With

This section should list any major frameworks/libraries used to bootstrap your project. Leave any add-ons/plugins for the acknowledgements section. Here are a few examples.

* [![Python][Python.org]][Python-url]
* [![Flask][Flask]][Flask-url]
* [![SQLite][SQLite.org]][SQLite-url]
<p align="right">(<a href="#readme-top">back to top</a>)</p>


## Getting Started

---
### Prerequisites
* `Python3`
* `flask`
* `flask_sqlalchemy`
* `SQLite3`


### Usage

* Clone this project using - `git clone https://github.com/dyte-submissions/november-2023-hiring-Aditya-Raj-Vaibhav.git`
* Come under Flask application directory - `cd <Flask Application Path>`
* Run application using -`flask --app app run`
* See app running on - `http://127.0.0.1:3000`
* [Log Ingestor Demo](/assets/log-ingestor-demo.mov)

<p align="right">(<a href="#readme-top">back to top</a>)</p>


[Python.org]: https://img.shields.io/badge/python-3670A0?style=for-the-badge&logo=python&logoColor=ffdd54
[Python-url]: https://python.org
[Flask]: https://img.shields.io/badge/Flask-000000?style=for-the-badge&logo=flask&logoColor=white
[Flask-url]: https://flask.palletsprojects.com/
[SQLite.org]: https://img.shields.io/badge/SQLite-07405E?style=for-the-badge&logo=sqlite&logoColor=white
[SQLite-url]: https://www.sqlite.org/
[log-ingestor]: assets/log-ingestor-demo.mov
