export default function getSortedContacts(contacts) {
  let contactsStructure = []

  let firstLvlParents = []

  contacts.forEach(item => {
    if (item.chief) {
      firstLvlParents.push(item.id)
    }
  })

  firstLvlParents.forEach(id => {
    let contact = contacts.find(item => item.id === id)
    let children = getChildren(contact.children)
    contact.children = children
    contactsStructure.push(contact)
  })

  function getChildren(children) {
    if (children.length > 0) {
      let returnChildren = []
      children.forEach(id => {
        let contact = typeof id === 'number'
          ? contacts.find(item => item.id === id)
          : id

        let children = getChildren(contact.children)
        contact.children = children
        returnChildren.push(contact)
      })
      return returnChildren
    } else {
      return []
    }
  }

  return contactsStructure
}
