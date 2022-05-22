const invoke = require("./contacts");
const argv = require("yargs").argv;

const invokeAction = async ({ action, id, name, email, phone }) => {
  switch (action) {
    case "list":
      const list = await invoke.listContacts();
      console.log(list);
      break;
    case "get":
      await invoke.getContactById(String(id));
      break;

    case "add":
      invoke.addContact(name, email, phone);
      break;

    case "remove":
      invoke.removeContact(String(id));
      break;

    default:
      console.warn("\x1B[31m Unknown action type!");
  }
};

invokeAction(argv);
