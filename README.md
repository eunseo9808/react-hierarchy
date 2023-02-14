# react-hierarchy
React Hierarchy Component that can be easily customized.

## Demo

---
![demo](./.doc/demo.gif)


## Install

----
```shell
yarn add @eunseu/react-hierarchy
```
or
```shell
npm install @eunseu/react-hierarchy
```

## Usage

------
You can use this library in two ways.<br>
<b>First</b>, you can pass data as props

```javascript
import { Hierarchy } from '@eunseu/react-hierarchy';

<Hierarchy data={items} />
```

<b>Second</b>, You can custom your own hierarchy.
```javascript
import { HierarchyTree } from '@eunseu/react-hierarchy';

<HierarchyTree>
  <HierarchyTree.Folder>
    Folder1
    <HierarchyTree.Element>Element1</HierarchyTree.Element>
    
    <HierarchyTree.Folder>
      Folder2
      <HierarchyTree.Element>
        Element2
      </HierarchyTree.Element>
    </HierarchyTree.Folder>
    
    <HierarchyTree.Element>Element3</HierarchyTree.Element>
  </HierarchyTree.Folder>
</HierarchyTree>
```
## Data Format

------
If you want to create hierarchy as data, you should input your data

- required: `id`, `content`
- optional: `items`
- If you want to make folder, you should add `items` 
- example:
```ecmascript 6
[
  {
    "id": 1,
    "content": "Folder1",
    "items": [
      {
        "id": 2,
        "content": "Element1",
      }
    ]
  },
  {
    "id": 3,
    "content": "Element2"
  }
]
```

## Props

---
### Hierarchy
| Name             | Type                                                        | Default | Required | Description                                                          |
|------------------|-------------------------------------------------------------|---------|----------|----------------------------------------------------------------------|
| data             | `HierarchyItems[]`                                          | null    | Y        | The data set for react hierarchy to render                           |
| onToggleFolder   | `(e: React.MouseEvent<HTMLDivElement>, id: string) => void` | null    | N        | Event listener called on open some folder action                     |
| onClickElement   | `(e: React.MouseEvent<HTMLDivElement>, id: string) => void` | null    | N        | Event listener called on click element action                        |
| folderTemplate   | `(content: string) => ReactElement`                         | null    | N        | The contents of the folder can be customized through React Element.  |
| elementTemplate  | `(content: string) => ReactElement`                         | null    | N        | The contents of the element can be customized through React Element. |
| folderClassName  | `string`                                                    | null    | N        | Specify className in the folder                                      |
| elementClassName | `string`                                                    | null    | N        | Specify className in the element                                     |                                     
| defaultIsFold    | `boolean`                                                   | true    | N        | Whether to put all folders folded by default                         |
| depthInLength    | `number`                                                    | 20      | N        | Indent Length                                                        |
| animation        | `boolean`                                                   | true    | N        | Whether to use animation                                             |

### HierarchyTree
| Name          | Type      | Default  | Required  | Description                                  |
|---------------|-----------|----------|-----------|----------------------------------------------|
| defaultIsFold | `boolean` | true     | N         | Whether to put all folders folded by default |
| depthInLength | `number`  | 20       | N         | Indent Length                                |
| animation     | `boolean` | true     | N         | Whether to use animation                     |

## Contributing

---
- open issues and PRs and we'll work together!
