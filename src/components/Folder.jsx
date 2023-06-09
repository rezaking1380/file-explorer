import { useState } from "react";
import { FaFilePdf,FaFileWord,FaFileArchive,FaFilePowerpoint,FaFileAlt,
  FaFileExcel,FaFileCode, FaFolderOpen, FaFolder, FaFile,} from "react-icons/fa";


function Folder({ folder, depth = 0, handleDeleteItem,index }) {
  const [expanded, setExpanded] = useState(false);
  const [newFolderName, setNewFolderName] = useState('');
  const [newFileName, setNewFileName] = useState('');
  const [renameIndex, setRenameIndex] = useState(-1);
  const [renameValue, setRenameValue] = useState('');

  const iconMap = new Map([
    ['pdf', <FaFilePdf />],
    ['doc', <FaFileWord />],
    ['docx', <FaFileWord />],
    ['pptx', <FaFilePowerpoint />],
    ['xls', <FaFileExcel />],
    ['xlsx', <FaFileExcel />],
    ['js', <FaFileCode />],
    ['jsx', <FaFileCode />],
    ['ts', <FaFileCode />],
    ['tsx', <FaFileCode />],
    ['css', <FaFileCode />],
    ['scss', <FaFileCode />],
    ['html', <FaFileCode />],
    ['txt', <FaFileAlt />],
    ['rar', <FaFileArchive />],
    ['zip', <FaFileArchive />],
  ]);

  function FileIcon({ filename }) {
    const extension = filename.split('.').pop().toLowerCase();
    const icon = iconMap.get(extension);
    return icon || <FaFile />;
  }

  const toggleExpanded = () => {
    setExpanded(!expanded);
  };

  const handleNewFolderSubmit = (event) => {
    event.preventDefault();
    const newFolder = {
      name: newFolderName,
      isDirectory: true,
      children: [],
    };
    folder.children.push(newFolder);
    setNewFolderName('');
  };

  const handleNewFileSubmit = (event) => {
    event.preventDefault();
    const newFile = {
      name: newFileName,
      isDirectory: false,
    };
    folder.children.push(newFile);
    setNewFileName('');
  };

  const handleRenameValueChange = (event) => {
    setRenameValue(event.target.value);
  };

  const handleRenameSubmit = (event) => {
    event.preventDefault();
      console.log(renameValue);
      console.log(index)
      console.log(folder)
    const newChildren = [...folder.children];
    console.log(newChildren)
    newChildren[renameIndex].name = renameValue;
    folder.children = newChildren;
    setRenameIndex(-1);
    setRenameValue('');
  };
  const handleCancelRename = () => {
    setRenameIndex(-1);
    setRenameValue('');
  };
  console.log(folder)

  const handleRenameFolderSubmit = (event) => {
    event.preventDefault()
    folder.name = renameValue
    // const newChildren = [...folder.children];
    // newChildren[index].name = renameValue;
    // folder.children = newChildren;
    setRenameIndex(-1);
    setRenameValue('');
  };

  return (
    <div style={{ marginLeft: depth * 20 }} className="py-4 px-8 bg-[#fde68a] rounded-lg">
      <div onClick={toggleExpanded} className="flex justify-evenly items-center">
        <div className="mr-2">
        {expanded ? <FaFolderOpen /> : <FaFolder />}
        </div>
        {renameIndex === -1 ? (
          <span className="w-1/2">{folder.name}</span>
        ) : (
          <form onSubmit={handleRenameFolderSubmit}>
            <input
              type="text"
              value={renameValue}
              onChange={handleRenameValueChange}
              className="py-2 px-3 mr-3 rounded-lg"
            />
            <button type="submit" className="py-2 px-3 mr-3 rounded-lg bg-green-300">Save</button>
            <button type="button" onClick={handleCancelRename}>
              Cancel
            </button>
          </form>
        )}
        <div className="w-1/2 flex justify-around">
        <button onClick={() => handleDeleteItem(folder)} className="bg-red-400 rounded-lg px-3 px-2">Delete</button>
        <button onClick={() => setRenameIndex(index)} className="bg-stone-400 rounded-lg px-3 px-2">Rename</button>
        </div>
      </div>
      {expanded && (
        <div>
          {folder.children.map((child, index) =>
            child.isDirectory ? (
              <Folder
                key={child.name}
                folder={child}
                depth={depth + 1}
                handleDeleteItem={(item) => handleDeleteItem(item)}
                handleRenameItem={(index) => setRenameIndex(index)}
                index={index}
              />
            ) : (
              <div style={{ marginLeft: (depth + 1) * 20 }} key={child.name} className="flex justify-between items-center px-3 py-2">
                {renameIndex === index ? (
                  <form onSubmit={handleRenameSubmit}>
                    <input
                      type="text"
                      value={renameValue}
                      onChange={handleRenameValueChange}
                      className="py-2 px-3 mr-3 rounded-lg"
                    />
                    <button type="submit">Save</button>
                    <button type="button" onClick={handleCancelRename}>
                      Cancel
                    </button>
                  </form>
                ) : (
                  <>
                  <div className="mr-2">
                    <FileIcon filename={child.name} />
                  </div>
                    <span className="w-1/2">{child.name}</span>
                    <div className="w-1/2 flex justify-around">
                    <button onClick={() => handleDeleteItem(child)} className="bg-red-400 rounded-lg px-3 px-2">
                      Delete
                    </button>
                    <button onClick={() => setRenameIndex(index)} className="bg-stone-300 rounded-lg px-3 px-2">
                      Rename
                    </button>
                    </div>
                    
                  </>
                )}
              </div>
            )
          )}
          <div className="flex">
          <form onSubmit={handleNewFolderSubmit} className="py-2 px-4">
            <input
              type="text"
              placeholder="New Folder Name"
              value={newFolderName}
              onChange={(event) => setNewFolderName(event.target.value)}
              className="py-2 px-3 mr-3 rounded-lg"
            />
            <button type="submit">Create Folder</button>
          </form>
          <form onSubmit={handleNewFileSubmit} className="py-2 px-4">
            <input
              type="text"
              placeholder="New File Name"
              value={newFileName}
              onChange={(event) => setNewFileName(event.target.value)}
              className="py-2 px-3 mr-3 rounded-lg"
            />
            <button type="submit">Create File</button>
          </form>
          </div>
        </div>
      )}
    </div>
  );
}
export default Folder;