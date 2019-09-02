import React, { Component } from 'react'
import { connect } from 'react-redux';
import { getPhotos } from '../services/Gallery/actions'

const mainContainer = {
    backgroundColor:'black',
}

const galleryContainer = {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    alignContent: 'flex-start',
}

const searchStyle = {
    textTransform: 'uppercase',
    width: '80%',
    marginLeft: 'auto',
    marginRight: 'auto',
}

const URL_PREPEND = `http://localhost:3000/daily-photos/`;
const SEARCH_STARTS_WITH = "Search-StartsWith";
const SEARCH_CONTAINS = "Search-Contains";
const NUM_OF_ROWS_PER_PAGE = 3;

class Gallery extends Component {
    constructor(props) {   
        super(props);
        this.state = {  
            photos: [], // keeps a list of all the photos
            value: '',
            startsWithValue: '',
            selectedOption: null,
            randWidthArr: null,
        } 

        this.getURLTitle = this.getURLTitle.bind(this);
        this.pagerClicked = this.pagerClicked.bind(this);
        this.setPhotoList = this.setPhotoList.bind(this);
        this.emptyStr = this.emptyStr.bind(this);
    }

    componentDidMount() {
        const { getPhotosAction } = this.props;
        getPhotosAction();
    }

    setPhotoList(from, to, originalArray=[]) {
        let arrObj = [];
        for (let i = from; i <= to; i++) {
            arrObj.push({found: [], pattern: '', url: originalArray[i]
            });
        }
        return arrObj;
    }

    emptyStr(str) {return (!str || str === '');}

    searchWithHandleChange(type, event) {
        let titleSubStr = event.target.value;
        const { treeWithPhotos, pageLinks } = this.props;
        let arr = treeWithPhotos.firstToLast();

        let searchResults;
        switch (type) {
            case SEARCH_STARTS_WITH:
                this.setState({startsWithValue: titleSubStr});
                searchResults = treeWithPhotos.searchForStartingWith(URL_PREPEND, titleSubStr);
                break;
            case SEARCH_CONTAINS:
                this.setState({value: titleSubStr});
                searchResults = treeWithPhotos.searchForAnyMatch(URL_PREPEND, titleSubStr);
                break;
            default:
                break;
        }
        let results = this.emptyStr(titleSubStr) ?
        this.setPhotoList(pageLinks[0].from, pageLinks[0].to, arr) : searchResults;
        this.setState({photos: results});
    }

    promisifySetState(newState) {
        return new Promise((resolve) => this.setState(newState, () => resolve()));
    }

    pagerClicked(linkObj) {
        const { treeWithPhotos } = this.props;
        let arr = treeWithPhotos.firstToLast();
        let photoArr = this.setPhotoList(linkObj.from, linkObj.to, arr);
        this.promisifySetState({ photos: photoArr }).then(() => {
            setTimeout(()=>{
                window.scroll({top: 0, left: 0, behavior: 'smooth'});
            },800);
        });
    }

    static getDerivedStateFromProps(nextProps, prevState) {
        if (prevState.photos && prevState.photos.length === 0 && prevState.startsWithValue !== '') {
            console.log(' photo array is empty AND value of STARTS WITH exists');
            return { photos: [] }
        }
        if (prevState.photos && prevState.photos.length === 0 && prevState.value !== '') {
            console.log(' photo array is empty AND value of TITLE CONTAINS exists');
            return { photos: [] }
        }
        if ((prevState.value === '' && prevState.photos && prevState.photos.length === 0)
        || (prevState.startsWithValue === '' && prevState.photos && prevState.photos.length === 0))  {
            if (nextProps.treeWithPhotos) {
                console.log("MARK 2");
                let linkArr = nextProps.pageLinks;
                let arr = nextProps.treeWithPhotos.firstToLast();
                let arrObj = [];
                for (let i = linkArr[0].from; i <= linkArr[0].to; i++) {
                    arrObj.push({ found: [], pattern: '', url: arr[i] });
                }
                return { photos: arrObj }
            } else { return { photos: [] } }
        }
        return { photos: prevState.photos }
     }

    getURLTitle( url )  {
        if (typeof url === 'string') {
            return url.substring(url.lastIndexOf('/')+1, url.lastIndexOf('.'));
        } else if (typeof url === 'object') {
            return url.text;
        }
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevProps && prevProps.treeWithPhotos && prevProps.pageLinks) {
            let linkArr = prevProps.pageLinks;
            let arr = prevProps.treeWithPhotos.firstToLast();
            return { photos : this.setPhotoList(linkArr[0].from, linkArr[0].to, arr) };
        }
    }

    render() {
        const { photos } = this.state;
        const { widthArr, pageLinks } = this.props;
        return (
            <div id="galleryWrapper">
                <div id="gallery" className="row align-items-stretch">  
                    <div id="buttonPanel" style={searchStyle} className="btn-toolbar mb-3" role="toolbar" aria-label="Toolbar with button groups">
                        <div className="input-group">
                            <div className="input-group-prepend">
                            <div className="input-group-text" id="btnGroupAddon">Title contains: </div>
                            </div>
                            <input value={this.state.value} onChange={this.searchWithHandleChange.bind(this, SEARCH_CONTAINS)} 
                                    type="text" className="form-control" placeholder="title name" 
                                    aria-label="title name" aria-describedby="btnGroupAddon" />   
                        </div>
                        <div className="input-group">
                            <div className="input-group-prepend">
                            <div className="input-group-text" id="btnGroupStartsWith">Starts With: </div>
                            </div>
                            <input value={this.state.startsWithValue} onChange={this.searchWithHandleChange.bind(this, SEARCH_STARTS_WITH)} 
                                    type="text" className="form-control" placeholder="starts with" 
                                    aria-label="starts with" aria-describedby="btnGroupStartsWith" />   
                        </div>
                    </div>
                    {photos.map((photoObj, index) => {
                        let cssClasses = 'col-6 col-md-6 col-lg-' + widthArr[index];
                        return (
                            <div className={cssClasses} data-aos="fade-up">
                            <a href={photoObj.url}  className="d-block photo-item" data-fancybox="gallery">
                            <img src={photoObj.url} alt="Image" className="img-fluid" />
                            <div className="photo-text-more">
                                <h3 className="heading">{this.getURLTitle(photoObj.url)}</h3>
                                <span class="icon icon-search"></span>
                            </div>
                            </a>
                        </div>);
                    })}
                </div>
                <div id="pager">
                {pageLinks ? pageLinks.map((linkObj, index) => {
                    return (
                        <button onClick={(event) => {this.pagerClicked(linkObj)}}
                                type="button" 
                                className="btn btn-secondary">
                                {linkObj.from} - {linkObj.to}
                        </button>
                    );
                }) : null}
                </div>
            </div>
        );
    }
}


// partial function
// generates random widths if bootstrap total width is 12
const randomTwelveColumnWidthsForRow = function(secretNum) {
    return util_generateRowOfImageWidths(secretNum, [
        [12],
        [4, 8],
        [8, 4],
        [6, 6],
        [6, 3, 3],
        [3, 6, 3],
        [3, 3, 6],
        [3, 3, 3, 3],
        [4, 4, 4]
    ]);
}

// partial function
// generates random widths if bootstrap total width is 8
const randomEightColumnWidthsForRow = function(secretNum) {
    return util_generateRowOfImageWidths(secretNum, [
        [8],
        [6, 2],
        [2, 6],
        [4, 4],
        [2, 2, 4],
        [2, 4, 2],
        [4, 2, 2],
        [2, 2, 2, 2]
    ]);
}


function util_generateRowOfImageWidths(secretNum, combinations) {
    let randomIndex = Math.floor(Math.random() * secretNum) % combinations.length;
    return combinations[randomIndex];
}


function createOnePageOfWidthsFromNumOfPhotos(numOfPhotos) {
    let photoCounter = numOfPhotos;
    let rowOfWidthsArr = new Array();
    while (photoCounter > 0) {
        let oneRowOfWidths = randomTwelveColumnWidthsForRow(5132019);
        if (oneRowOfWidths.length > photoCounter) {
            oneRowOfWidths = oneRowOfWidths.slice(0, photoCounter);
            rowOfWidthsArr.push(oneRowOfWidths);
            break;
        }
        rowOfWidthsArr.push(oneRowOfWidths);
        if (rowOfWidthsArr.length === NUM_OF_ROWS_PER_PAGE) {break;}
        photoCounter = photoCounter - oneRowOfWidths.length;
    }
    console.log(`There are ${rowOfWidthsArr.length} rows`);
    return rowOfWidthsArr;
}


function setLinkIndexForImages(rowOfWidthsArr, numOfPhotos) {
    let links = [];
    

    let interval = 0;
    for (let i = 0; i < rowOfWidthsArr.length; i++) {
        interval = interval + rowOfWidthsArr[i].length;
    }


    console.log(` √  interval to jump is ${interval}`);

    let fullPages = Math.floor(numOfPhotos/interval);
    console.log(` there are ${fullPages} full pages`);

    let leftover = numOfPhotos % interval;
    console.log(`there are ${leftover} leftover images`);

    let cur = 0;
    let tmpIndexObj;
    for (let i = 0; i < fullPages; i++) {
        tmpIndexObj = {
            from: cur,
            to: cur + interval - 1
        }
        links.push(tmpIndexObj);
        cur = cur + interval;
    }

    if (leftover !== 0) {        
        tmpIndexObj = {from: cur,to: cur + leftover-1}
        links.push(tmpIndexObj);
    }

    console.log(links);
    return links;
    
}

const mapStateToProps = function(state) {
    const { photoReducer} = state;
    let flattened = null;
    let links = null;
    
    if (photoReducer && photoReducer.photoData) {
        console.log('calculating photos and links');
        let numOfPhotos = photoReducer.photoData.firstToLast().length;
        let pageOfWidthsArr = createOnePageOfWidthsFromNumOfPhotos(numOfPhotos);
        console.log(pageOfWidthsArr);

        links = setLinkIndexForImages(pageOfWidthsArr, numOfPhotos);
        flattened = [].concat.apply([], pageOfWidthsArr);

        console.log(flattened);
        console.log('photos and links ready');
    }

    return {
        // it is an AVL tree
        treeWithPhotos: photoReducer.photoData,
        widthArr: flattened,
        pageLinks: links
    }
}

export default connect(mapStateToProps, {
getPhotosAction: getPhotos,
})(Gallery); 