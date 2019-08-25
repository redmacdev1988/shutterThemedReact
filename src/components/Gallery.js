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
        } 
        this.titleContainsHandleChange = this.titleContainsHandleChange.bind(this);
        this.startsWithHandleChange = this.startsWithHandleChange.bind(this);
        this.aToZClicked = this.aToZClicked.bind(this);
        this.zToAClicked = this.zToAClicked.bind(this);
        this.getURLTitle = this.getURLTitle.bind(this);
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
        const { photos } = this.state;
        const { randWithArr } = this.props;
        return (
            <div id="gallery" className="row align-items-stretch">  
                <div style={searchStyle} className="btn-toolbar mb-3" role="toolbar" aria-label="Toolbar with button groups">
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
        );
    }
}

function util_generateImageWidths() {
    let combinations = [
        [12],
        [4, 8],
        [8, 4],
        [6, 6],
        [6, 3, 3],
        [3, 6, 3],
        [3, 3, 6],
        [3, 3, 3, 3],
        [4, 4, 4]
    ];

    let comboToUse = Math.floor(Math.random() * 5132019) % combinations.length;
    return combinations[comboToUse];

}

const mapStateToProps = function(state) {
    const { photoReducer} = state;
    let flattened = null;

    if (photoReducer && photoReducer.photoData) {
        let numOfPhotos = photoReducer.photoData.firstToLast().length;
        let arrOfWidth = [numOfPhotos];
        for (let i = 0; i < numOfPhotos; i++) { arrOfWidth[i] = util_generateImageWidths(); }
        flattened = [].concat.apply([], arrOfWidth);
    }
    return {
        // it is an AVL tree
        treeWithPhotos: photoReducer.photoData,
        randWithArr: flattened
    }
}
  
  export default connect(mapStateToProps, {
    getPhotosAction: getPhotos,
  })(Gallery);