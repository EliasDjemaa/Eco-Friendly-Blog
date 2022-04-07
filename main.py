' This is a blog scraping script by Elias Djemaa 2012464 '
import self as self
from googlesearch import Search
import re
import urllib.request
import requests
import validators
import sqlite3
import mysql.connector

searchQ = ['climate blog', 'global warming blog','cop26 blog', 'unfccc blog', 'ipcc report 2021']
bgTuple = []
print(bgTuple)

for i in range(len(searchQ)):
    qry = searchQ[i]
    bgSearch = Search(qry)
    print('searching qry: ')
    print(qry)
    bgSearch.results
    if bgSearch.results not in bgTuple:
        bgTuple.append(bgSearch.results)
        print('url added to list')
    else:
        print('url in list')

"storing urls to a list"
urllist = {}
url=re.findall(r'(www?\S+)', str(bgTuple))
urllen = len(url)
print('-------------------------')
print(urllen)
validURL = []

for i in range(len(url)):
    url[i] = 'http://'+str(url[i])
    print(url[i])

for i in range(len(url)):
    if i == len(url):
        break
    if i <= len(url):
        print(i)
        result = validators.url(url[i])
        print(result)
        if result == True:
            validURL.insert(i, url[i])
            print('keep url' +url[i])
        else:
            print('url ' +url[i], 'removed')
            print(url)

print('list of urls')
print(validURL)

'CHECK IF STORED URLS FROM QUERY SEARCH HAVE BLOG PAGES'



for i in range(len(url)):
    link = ''.join(map(str, url[2]))
    response = requests.get(link)
    if response.status_code == 200:
        print('------------BLOG CHECK--------------')
        print(url[i])
        print('URL has blog page')
        validURL.append(link)
    elif response.status_code == 404:
        print('Not Found.')
    else:
        print('URL does not have a blogs page')


db = mysql.connector.connect(
    host='localhost',
    user='root',
    passwd='MyNewPass',
    database='validBlogs'
)

mycursor = db.cursor()

for i in range(len(validURL)):
    vals = [(val,) for val in validURL]
    mycursor.executemany("INSERT INTO validURL (`url`) VALUES (%s)", vals)
    db.commit()

mycursor.execute("SELECT * FROM validURL")

for x in mycursor:
    print(x)
