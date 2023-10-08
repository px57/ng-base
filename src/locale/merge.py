
import os
import sys
import xml
import bs4
import lxml
from bs4 import BeautifulSoup as bs
import pprint



def readXml(path):
    """
        @description: Read an XML file and return a DOM tree.
    """
    content = []
    with open(path, "r") as file:
        content = file.readlines()
    content = "".join(content)
    bs_content = bs(content, "lxml")

    return bs_content

def generateListId(translateFile):
    """
        @description: 
    """
    listId = {}
    for transunit in translateFile.find_all('trans-unit'):
        listId[transunit['id']] = transunit
    return listId

def getAddLineList(holdListId, newListId):
    """
        @description: Reperer les nouvelles ligne a ajouter dans le fichier de traduction.
    """
    addLineList = {}
    for id in newListId:
        if id not in holdListId:
            addLineList[id] = newListId[id]
    return addLineList

def getDropLineList(holdListId, newListId):
    """
        @description: Reperer les ligne a supprimer dans le fichier de traduction.
    """
    dropLineList = {}
    for id in holdListId:
        if id not in newListId:
            dropLineList[id] = holdListId
    return dropLineList

def generateNewFile(holdListId, addLineList, dropLineList):
    """
        @description: 
    """
    file = []
    for key in holdListId:
        if key not in dropLineList:
            file.append(holdListId[key])

    for key in addLineList:
        file.append(addLineList[key])
    
    content = ''
    for line in file:
        content += str(line.prettify())

    before_content = """
<?xml version="1.0" encoding="UTF-8" ?>
    <xliff version="1.2" xmlns="urn:oasis:names:tc:xliff:document:1.2">
    <file source-language="en-US" datatype="plaintext" original="ng2.template">
    <body>
    """
    after_content = """
    </body>
    </file>
</xliff>
    """ 

    print (before_content + content + after_content)
    fd = open('./merge_file.xlf', 'w+')
    fd.write(before_content + content + after_content)
    fd.close()


def main():
    """
        @description: Merge all the locale files in the given directory into a single.
    """
    newTranslateFile = readXml('./messages.xlf')
    holdTranslateFile = readXml('./messages.fr.xlf')

    holdListId = generateListId(holdTranslateFile)
    newListId = generateListId(newTranslateFile)

    addLineList = getAddLineList(holdListId, newListId)
    dropLineList = getDropLineList(holdListId, newListId)

    generateNewFile(holdListId, addLineList, dropLineList)

main()