import Mirage from 'ember-cli-mirage';

export default function() {
  this.get('/centers', function() {
    return {
      data: [{
        type: 'centers',
        id: 1,
        attributes: {
          name: 'Grand Old Mansion',
          owner: 'Veruca Salt',
          city: 'San Francisco',
          type: 'Estate',
          bedrooms: 15,
          latitude: 37.9624255,
          longitude: 23.7573327,
          image: 'https://upload.wikimedia.org/wikipedia/commons/c/cb/Crane_estate_(5).jpg',
          type: 1,
          refugees: 522
        }
      }, {
        type: 'centers',
        id: 2,
        attributes: {
          name: 'Urban Living',
          owner: 'Mike Teavee',
          city: 'Seattle',
          type: 'Condo',
          bedrooms: 1,
          latitude: 38.6113327,
          longitude: 23.3244417,
          image: 'https://upload.wikimedia.org/wikipedia/commons/0/0e/Alfonso_13_Highrise_Tegucigalpa.jpg',
          type: 2,
          refugees: 205,
          phone: "69435567444",
          contactmail: "xontros@gmail.com"
        },
        relationships: {
           "center-needs": {
            "links": [
              {"self": "http://localhost:4200/centers/2/relationships/center-needs"},
              {"related": "http://localhost:4200/centers/2/center-needs"}
            ],
            "data": [
              { "type": "center-needs", "id": "2" },
              { "type": "center-needs", "id": "3" },
              { "type": "center-needs", "id": "1" },
              { "type": "center-needs", "id": "4" }
            ]
          }
        }
      }, {
        type: 'centers',
        id: 3,
        attributes: {
          name: 'Downtown Charm',
          owner: 'Violet Beauregarde',
          city: 'Portland',
          type: 'Apartment',
          bedrooms: 3,
          latitude: 41.6311892,
          longitude: 22.6082705,
          image: 'https://upload.wikimedia.org/wikipedia/commons/f/f7/Wheeldon_Apartment_Building_-_Portland_Oregon.jpg',
          type: 3,
          refugees: 50000
        }
      },
{
        type: 'centers',
        id: 14,
        attributes: {
          name: 'Grand Old Mansion',
          owner: 'Veruca Salt',
          city: 'San Francisco',
          type: 'Estate',
          bedrooms: 15,
          latitude: 37.9624255,
          longitude: 23.7573327,
          image: 'https://upload.wikimedia.org/wikipedia/commons/c/cb/Crane_estate_(5).jpg',
          type: 1,
          refugees: 522
        }
      }, {
        type: 'centers',
        id: 15,
        attributes: {
          name: 'Urban Living',
          owner: 'Mike Teavee',
          city: 'Seattle',
          type: 'Condo',
          bedrooms: 1,
          latitude: 38.6113327,
          longitude: 23.3244417,
          image: 'https://upload.wikimedia.org/wikipedia/commons/0/0e/Alfonso_13_Highrise_Tegucigalpa.jpg',
          type: 2,
          refugees: 205
        }
      }, {
        type: 'centers',
        id: 16,
        attributes: {
          name: 'Downtown Charm',
          owner: 'Violet Beauregarde',
          city: 'Portland',
          type: 'Apartment',
          bedrooms: 3,
          latitude: 41.6311892,
          longitude: 22.6082705,
          image: 'https://upload.wikimedia.org/wikipedia/commons/f/f7/Wheeldon_Apartment_Building_-_Portland_Oregon.jpg',
          type: 3,
          refugees: 50000
        }
      },
{
        type: 'centers',
        id: 23,
        attributes: {
          name: 'Grand Old Mansion',
          owner: 'Veruca Salt',
          city: 'San Francisco',
          type: 'Estate',
          bedrooms: 15,
          latitude: 37.9624255,
          longitude: 23.7573327,
          image: 'https://upload.wikimedia.org/wikipedia/commons/c/cb/Crane_estate_(5).jpg',
          type: 1,
          refugees: 522
        }
      }, {
        type: 'centers',
        id: 24,
        attributes: {
          name: 'Urban Living',
          owner: 'Mike Teavee',
          city: 'Seattle',
          type: 'Condo',
          bedrooms: 1,
          latitude: 38.6113327,
          longitude: 23.3244417,
          image: 'https://upload.wikimedia.org/wikipedia/commons/0/0e/Alfonso_13_Highrise_Tegucigalpa.jpg',
          type: 2,
          refugees: 205
        }
      }, {
        type: 'centers',
        id: 25,
        attributes: {
          name: 'Downtown Charm',
          owner: 'Violet Beauregarde',
          city: 'Portland',
          type: 'Apartment',
          bedrooms: 3,
          latitude: 41.6311892,
          longitude: 22.6082705,
          image: 'https://upload.wikimedia.org/wikipedia/commons/f/f7/Wheeldon_Apartment_Building_-_Portland_Oregon.jpg',
          type: 3,
          refugees: 50000
        }
      },
{
        type: 'centers',
        id: 19,
        attributes: {
          name: 'Grand Old Mansion',
          owner: 'Veruca Salt',
          city: 'San Francisco',
          type: 'Estate',
          bedrooms: 15,
          latitude: 37.9624255,
          longitude: 23.7573327,
          image: 'https://upload.wikimedia.org/wikipedia/commons/c/cb/Crane_estate_(5).jpg',
          type: 1,
          refugees: 522
        }
      }, {
        type: 'centers',
        id: 21,
        attributes: {
          name: 'Urban Living',
          owner: 'Mike Teavee',
          city: 'Seattle',
          type: 'Condo',
          bedrooms: 1,
          latitude: 38.6113327,
          longitude: 23.3244417,
          image: 'https://upload.wikimedia.org/wikipedia/commons/0/0e/Alfonso_13_Highrise_Tegucigalpa.jpg',
          type: 2,
          refugees: 205
        }
      }, {
        type: 'centers',
        id: 35,
        attributes: {
          name: 'Downtown Charm',
          owner: 'Violet Beauregarde',
          city: 'Portland',
          type: 'Apartment',
          bedrooms: 3,
          latitude: 41.6311892,
          longitude: 22.6082705,
          image: 'https://upload.wikimedia.org/wikipedia/commons/f/f7/Wheeldon_Apartment_Building_-_Portland_Oregon.jpg',
          type: 3,
          refugees: 50000
        }
      }
      ]
    };
  });  
  this.get('/centers/2', function() {
    return {
      data: {
        type: 'centers',
        id: 2,
        attributes: {
          name: 'Urban Living',
          owner: 'Mike Teavee',
          city: 'Seattle',
          type: 'Condo',
          bedrooms: 1,
          latitude: 38.6113327,
          longitude: 23.3244417,
          refugees: 50021,
          image: 'https://upload.wikimedia.org/wikipedia/commons/0/0e/Alfonso_13_Highrise_Tegucigalpa.jpg',
          type: 2,
          phone: "69435567444",
          contactmail: "xontros@gmail.com"
        },
        relationships: {
           "center-needs": {
            "links": [
              {"self": "http://localhost:4200/centers/2/relationships/center-needs"},
              {"related": "http://localhost:4200/centers/2/center-needs"}
            ],
            "data": [
              { "type": "center-needs", "id": "2" },
              { "type": "center-needs", "id": "3" },
              { "type": "center-needs", "id": "1" },
              { "type": "center-needs", "id": "4" }
            ]
          }
        }
      }
    }
  });
  this.get('/centers/me', function() {
    return {
      data: {
        type: 'centers',
        id: 2,
        attributes: {
          name: 'Urban Living',
          owner: 'Mike Teavee',
          city: 'Seattle',
          type: 'Condo',
          bedrooms: 1,
          latitude: 38.6113327,
          longitude: 23.3244417,
          refugees: 50021,
          image: 'https://upload.wikimedia.org/wikipedia/commons/0/0e/Alfonso_13_Highrise_Tegucigalpa.jpg',
          type: 2,
          phone: "69435567444",
          contactmail: "xontros@gmail.com"
        },
        relationships: {
           "center-needs": {
            "links": [
              {"self": "http://localhost:4200/centers/2/relationships/center-needs"},
              {"related": "http://localhost:4200/centers/2/center-needs"}
            ],
            "data": [
              { "type": "center-needs", "id": "2" },
              { "type": "center-needs", "id": "3" },
              { "type": "center-needs", "id": "1" },
              { "type": "center-needs", "id": "4" }
            ]
          }
        }
      }
    }
  });
  this.get('/centers/2/center_needs', function() {
     data: [{
        type: 'center-needs',
        id: 1,
        attributes: {
         name: 'trofima',
          importance: 2,
          updated_at: "2016-01-05 15:46:04",
          text: 'https://upload.wikimedia.org/wikipedia/commons/0/0e/Alfonso_13_Highrise_Tegucigalpa.jpg',
        }
      },
      {
        type: 'center-needs',
        id: 2,
        attributes: {
         name: 'trofima',
          importance: 0,
          updated_at: "2016-01-05 15:46:04",
          text: 'https://upload.wikimedia.org/wikipedia/commons/0/0e/Alfonso_13_Highrise_Tegucigalpa.jpg',
        }
      },
      {
        type: 'center-needs',
        id: 3,
        attributes: {
         name: 'trofima',
          importance: 1,
          updated_at: "2016-01-05 15:46:04",
          text: 'https://upload.wikimedia.org/wikipedia/commons/0/0e/Alfonso_13_Highrise_Tegucigalpa.jpg',
        }
      },
      {
        type: 'center-needs',
        id: 4,
        attributes: {
         name: 'rouxa',
          importance: 0,
          text: 'https://upload.wikimedia.org/wikipedia/commons/0/0e/Alfonso_13_Highrise_Tegucigalpa.jpg',
        }
      }]
    });
  this.get('/center-needs/2', function() {
    return {
      data: {
        type: 'center-needs',
        id: 2,
        attributes: {
         name: 'rouxa',
          importance: 1,
          updated_at: "2016-01-05 15:46:04",
          text: 'https://upload.wikimedia.org/wikipedia/commons/0/0e/Alfonso_13_Highrise_Tegucigalpa.jpg',
        },
        relationships: {
           "center": {
            "links": [
              {"self": "http://localhost:4200/centers/2"},
              {"related": "http://localhost:4200/centers/2"}
            ],
            "data": 
              { "type": "center", "id": "2" }
            
          }
        }
      }
    }
  });
  this.get('/center-needs/1', function() {
    return {
      data: {
        type: 'center-needs',
        id: 1,
        attributes: {
          name: 'farmaka',
          importance: 2,
          updated_at: "2016-01-05 15:46:04",
          text: 'https://upload.wikimedia.org/wikipedia/commons/0/0e/Alfonso_13_Highrise_Tegucigalpa.jpg',
        },
        relationships: {
           "center": {
            "links": [
              {"self": "http://localhost:4200/centers/2"},
              {"related": "http://localhost:4200/centers/2"}
            ],
            "data": 
              { "type": "center", "id": "2" }
          }
        }
      }
    }
  });
  this.get('/center-needs/3', function() {
    return {
      data: {
        type: 'center-needs',
        id: 3,
        attributes: {
         name: 'giatroi',
          importance: 0,
          updated_at: "2016-01-05 15:46:04",
          text: 'https://upload.wikimedia.org/wikipedia/commons/0/0e/Alfonso_13_Highrise_Tegucigalpa.jpg',
        },
        relationships: {
           "center": {
            "links": [
              {"self": "http://localhost:4200/centers/2"},
              {"related": "http://localhost:4200/centers/2"}
            ],
            "data": 
              { "type": "center", "id": "2" }
            
          }
        }
      }
    }
  });
  this.get('/center-needs/4', function() {
    return {
      data: {
        type: 'center-needs',
        id: 4,
        attributes: {
         name: 'trofima',
          importance: 0,
          updated_at: "2016-01-05 15:46:04",
          text: 'https://upload.wikimedia.org/wikipedia/commons/0/0e/Alfonso_13_Highrise_Tegucigalpa.jpg',
        },
        relationships: {
           "center": {
            "links": [
              {"self": "http://localhost:4200/centers/2"},
              {"related": "http://localhost:4200/centers/2"}
            ],
            "data": 
              { "type": "center", "id": "2" }
            
          }
        }
      }
    }
  });  
  this.post('/oauth2', function(db, request) {
    if (request.requestBody === "grant_type=password&username=asdf&password=asdfasdf"){
      return {
        access_token: "8piNMXW7ZcpTo53RRowSH6JS",
        token_type: "bearer"
      }
    } 
    else {
      return new Mirage.Response(400, { some: 'header' }, { message: 'name cannot be blank' });      
    }
  });  
  this.post('/oauth2/revoke', function() {
    return {
    }
  });  
}


