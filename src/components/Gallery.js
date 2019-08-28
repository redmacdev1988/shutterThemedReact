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

class Gallery extends Component {
    constructor(props) {   
        super(props);
        this.state = {  
            photos: null, // keeps a list of all the photos
            value: '',
            startsWithValue: '',
            selectedOption: null,
            randWidthArr: null,
            pages: [{
                from: 0,
                to: 18
            }, {
                from: 19,
                to: 40
            }, {
                from:41,
                to: 61
            }],
        } 
        this.titleContainsHandleChange = this.titleContainsHandleChange.bind(this);
        this.startsWithHandleChange = this.startsWithHandleChange.bind(this);
        this.aToZClicked = this.aToZClicked.bind(this);
        this.zToAClicked = this.zToAClicked.bind(this);
        this.getURLTitle = this.getURLTitle.bind(this);
        this.pagerClicked = this.pagerClicked.bind(this);

        this.childDiv = React.createRef();
    }

    componentDidMount() {
        console.log('-- componentDidMount --');
        const { getPhotosAction } = this.props;
        getPhotosAction();
    }

    componentWillUnmount() {
        console.log('-- componentWillUnmount --');
    }

    aToZClicked() {
        const { treeWithPhotos } = this.props;
        let arr = treeWithPhotos.firstToLast();
        let arrObj = [];
        for (let i = 0; i < arr.length; i++) {
            arrObj.push({
                found: [],
                pattern: '',
                url: arr[i]
            });
        }
        this.setState({ photos: arrObj });
    };


    zToAClicked() {
        const { treeWithPhotos } = this.props;
        let arr = treeWithPhotos.lastToFirst();
        let arrObj = [];
        for (let i = 0; i < arr.length; i++) {
            arrObj.push({
                found: [],
                pattern: '',
                url: arr[i]
            });
        }
        this.setState({ photos: arrObj });
    };

    startsWithHandleChange(event) {
        let searchPattern = event.target.value.trim();
        if (!searchPattern || searchPattern === '') {
            this.setState({ startsWithValue: searchPattern });
            const { treeWithPhotos } = this.props;
            let arr = treeWithPhotos.firstToLast();
            let arrObj = [];
            for (let i = 0; i < arr.length; i++) {
                arrObj.push({
                    found: [],
                    pattern: '',
                    url: arr[i]
                });
            }
            this.setState({ photos: arrObj });
        } else {
            this.setState({ startsWithValue: searchPattern });
            const { treeWithPhotos } = this.props;
            let prepend = `http://localhost:3000/daily-photos/`;
            let results = treeWithPhotos.searchForStartingWith(prepend, searchPattern);
            this.setState({ photos: results });
        }  
    }

    titleContainsHandleChange(event) {
        this.setState({ value: event.target.value });
        const { treeWithPhotos } = this.props;
        let prepend = `http://localhost:3000/daily-photos/`;
        let results = treeWithPhotos.searchForAnyMatch(prepend, event.target.value);
        this.setState({ photos: results });
    }

    pagerClicked() {
        console.log('pager clicked');
        const { treeWithPhotos } = this.props;
        let arr = treeWithPhotos.firstToLast();
        let arrObj = [];
        for (let i = 38; i < arr.length; i++) {
            arrObj.push({
                found: [],
                pattern: '',
                url: arr[i]
            });
        }
        this.setState({ photos: arrObj });

        const element = document.getElementById('buttonPanel');
        element.scrollIntoView({behavior: 'auto'});
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
        if (!prevState.photos) {
            console.log('no prev photo arr');
            if (nextProps.treeWithPhotos) {
                let arr = nextProps.treeWithPhotos.firstToLast();
                let arrObj = [];
                for (let i = 0; i < arr.length; i++) {
                    arrObj.push({
                        found: [],
                        pattern: '',
                        url: arr[i]
                    });
                }
                return { photos: arrObj } 
            } else {
                return { photos: [] }
            }
        }
        else if ((prevState.value === '' && prevState.photos && prevState.photos.length === 0)
        || (prevState.startsWithValue === '' && prevState.photos && prevState.photos.length === 0))  {
            if (nextProps.treeWithPhotos) {
                let arr = nextProps.treeWithPhotos.firstToLast();
                let arrObj = [];
                for (let i = 0; i < arr.length; i++) {
                    arrObj.push({
                        found: [],
                        pattern: '',
                        url: arr[i]
                    });
                }
                return { photos: arrObj }
            } else { 
                return { photos: [] } 
            }
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

    render() {
        const { photos, pages } = this.state;
        const { randWithArr } = this.props;
        return (
            <div id="galleryWrapper">
                <div id="gallery" className="row align-items-stretch">  
                    <div id="buttonPanel" style={searchStyle} className="btn-toolbar mb-3" role="toolbar" aria-label="Toolbar with button groups">
                        <div className="btn-group mr-2" role="group" aria-label="First group">
                            <button onClick={this.aToZClicked} type="button" className="btn btn-secondary">A to Z</button>
                            <button onClick={this.zToAClicked} type="button" className="btn btn-secondary">Z to A</button>
                        </div>
                        <div className="input-group">
                            <div className="input-group-prepend">
                            <div className="input-group-text" id="btnGroupAddon">Title contains: </div>
                            </div>
                            <input value={this.state.value} onChange={this.titleContainsHandleChange} 
                                    type="text" className="form-control" placeholder="title name" 
                                    aria-label="title name" aria-describedby="btnGroupAddon" />   
                        </div>
                        <div className="input-group">
                            <div className="input-group-prepend">
                            <div className="input-group-text" id="btnGroupStartsWith">Starts With: </div>
                            </div>
                            <input value={this.state.startsWithValue} onChange={this.startsWithHandleChange} 
                                    type="text" className="form-control" placeholder="starts with" 
                                    aria-label="starts with" aria-describedby="btnGroupStartsWith" />   
                        </div>
                    </div>
                    {photos.map((photoObj, index) => {
                        let cssClasses = 'col-6 col-md-6 col-lg-' + randWithArr[index];
                        return (
                            <div className={cssClasses} data-aos="fade-up">
                            <a href={photoObj.url}  className="d-block photo-item" data-fancybox="gallery">
                            <img src={photoObj.url} alt="Image" className="img-fluid" />
                            <div className="photo-text-more">
                                <h3 className="heading"><span>{index} | </span>{this.getURLTitle(photoObj.url)}</h3>
                                <span class="icon icon-search"></span>
                            </div>
                            </a>
                        </div>);
                    })}
                </div>
                <div id="pager">
                {pages.map((info, index) => {
                    return (
                        <button onClick={this.pagerClicked} type="button" className="btn btn-secondary">{info.from} - {info.to}</button>
                    );
                })}
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


function createRowOfWidthsArrFromNumOfPhotos(numOfPhotos) {
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
        photoCounter = photoCounter - oneRowOfWidths.length;
    }
    console.log(`There are ${rowOfWidthsArr.length} rows`);
    return rowOfWidthsArr;
}


function setNumOfRowsPerPage(numOfRowsPerPage) {
    
    return function(rowOfWidthsArr) {

        let links = [];
        let imageNum = 0;

        let tmpObj = {from: null, to: null};
        tmpObj.from = 0;

        for (let i = 0; i < rowOfWidthsArr.length; i++) {
            if ((i % numOfRowsPerPage == 0) && (i != 0)) {
                tmpObj.to = imageNum-1;
                links.push(tmpObj);
                tmpObj = {from: null, to: null};
                tmpObj.from = imageNum;
            }
            imageNum = imageNum + rowOfWidthsArr[i].length;
        }

        if (!tmpObj.to) {
            tmpObj.to = imageNum - 1;
            links.push(tmpObj);
        } 
        return links;
    }
}


function createImageIndexLinks(rowOfWidthsArr) {
    let links = [];
    let imageNum = 0;
    
    let tmpObj = {from: null, to: null};
    tmpObj.from = 0;
    for (let i = 0; i < rowOfWidthsArr.length; i++) {
        if ((i % 4 == 0) && (i != 0)) {
            tmpObj.to = imageNum-1;
            links.push(tmpObj);
            tmpObj = {from: null, to: null};
            tmpObj.from = imageNum;
        }
        imageNum = imageNum + rowOfWidthsArr[i].length;
    }

    if (!tmpObj.to) {
        tmpObj.to = imageNum - 1;
        links.push(tmpObj);
    } 
    return links;
}

const mapStateToProps = function(state) {
    const { photoReducer} = state;
    let flattened = null;
    let links = null;
    if (photoReducer && photoReducer.photoData) {
        let numOfPhotos = photoReducer.photoData.firstToLast().length;
        let rowOfWidthsArr = createRowOfWidthsArrFromNumOfPhotos(numOfPhotos);
        links = setNumOfRowsPerPage(4)(rowOfWidthsArr);
        console.log(links);
        flattened = [].concat.apply([], rowOfWidthsArr);
    }
    return {
        // it is an AVL tree
        treeWithPhotos: photoReducer.photoData,
        randWithArr: flattened,
        pageLinks: links
    }
}

export default connect(mapStateToProps, {
getPhotosAction: getPhotos,
})(Gallery); 