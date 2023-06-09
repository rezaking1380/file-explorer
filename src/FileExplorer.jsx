import { useState } from 'react';
import Folder from './components/Folder'



function FileExplorer() {
  const [rootFolder, setRootFolder] = useState({
    name: 'Root',
    isDirectory: true,
    children: [],
  });

  const handleDeleteItem = (item) => {
    const newChildren = rootFolder.children.filter(
      (child) => child !== item
    );
    setRootFolder((prevState) => ({
      ...prevState,
      children: newChildren,
    }));
  };

  return (
    <div className='m-20'>
      <div className='mb-5 text-4xl font-bold'>File Explorer</div>
      <Folder
        folder={rootFolder}
        handleDeleteItem={(item) => handleDeleteItem(item)}
      />
    </div>
  );
}

export default FileExplorer;