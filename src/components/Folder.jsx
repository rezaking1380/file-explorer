import { useState } from "react";
import {  } from "react-icons/fa";


function Folder({ folder, depth = 0, handleDeleteItem, handleRenameItem }) {
  const [expanded, setExpanded] = useState(false);
  const [newFolderName, setNewFolderName] = useState('');
  const [newFileName, setNewFileName] = useState('');
  const [renameIndex, setRenameIndex] = useState(-1);
  const [renameValue, setRenameValue] = useState('');

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
    const newChildren = [...folder.children];
    newChildren[renameIndex].name = renameValue;
    folder.children = newChildren;
    setRenameIndex(-1);
    setRenameValue('');
  };

  const handleCancelRename = () => {
    setRenameIndex(-1);
    setRenameValue('');
  };

  return (
    <div style={{ marginLeft: depth * 20 }}>
      <div onClick={toggleExpanded} className="flex justify-evenly">
        <i className={`fa fa-folder${expanded ? '-open' : ''}`}/>
        {renameIndex === -1 ? (
          <span className="w-1/2">{folder.name}</span>
        ) : (
          <form onSubmit={handleRenameSubmit}>
            <input
              type="text"
              value={renameValue}
              onChange={handleRenameValueChange}
            />
            <button type="submit">Save</button>
            <button type="button" onClick={handleCancelRename}>
              Cancel
            </button>
          </form>
        )}
        <div className="w-1/2 flex justify-around">
        <button onClick={() => handleDeleteItem(folder)}>Delete</button>
        <button onClick={() => setRenameIndex(-2)}>Rename</button>
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
              />
            ) : (
              <div style={{ marginLeft: (depth + 1) * 20 }} key={child.name} className="flex justify-between">
                {renameIndex === index ? (
                  <form onSubmit={handleRenameSubmit}>
                    <input
                      type="text"
                      value={renameValue}
                      onChange={handleRenameValueChange}
                    />
                    <button type="submit">Save</button>
                    <button type="button" onClick={handleCancelRename}>
                      Cancel
                    </button>
                  </form>
                ) : (
                  <>
                    <i className="fa fa-file"></i> 
                    <span className="w-1/2">{child.name}</span>
                    <div className="w-1/2 flex justify-around">
                    <button onClick={() => handleDeleteItem(child)}>
                      Delete
                    </button>
                    <button onClick={() => setRenameIndex(index)}>
                      Rename
                    </button>
                    </div>
                    
                  </>
                )}
              </div>
            )
          )}
          <form onSubmit={handleNewFolderSubmit}>
            <input
              type="text"
              placeholder="New Folder Name"
              value={newFolderName}
              onChange={(event) => setNewFolderName(event.target.value)}
            />
            <button type="submit">Create Folder</button>
          </form>
          <form onSubmit={handleNewFileSubmit}>
            <input
              type="text"
              placeholder="New File Name"
              value={newFileName}
              onChange={(event) => setNewFileName(event.target.value)}
            />
            <button type="submit">Create File</button>
          </form>
        </div>
      )}
    </div>
  );
}
export default Folder;