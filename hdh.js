'use strict';

const _ = require('lodash');
const Bluebird = require('bluebird');
const assert = require('chai').assert;
const expect = require('chai').expect;
const mirthSearchLoader = require('mirth-search-loader');
const mirthTest = require('mirth-test');

describe(__filename + '\n', function () {

    this.timeout(mirthTest.constants.TIMEOUT);
    let accessibleApplicationEndpoint = `${mirthTest.constants.BASE_URL}accessible-applications`;
    let eventAuditEndpoint = `${mirthTest.constants.BASE_URL}event-audits`;

    const accessibleApplication = (e) => {
        return {
            "accessibleApplicationName": e ? "Stackoverflow" : "Stackexchange",
            "accessibleApplicationUrl": e ? "https://www.stackoverflow.com" : "https://www.stackexchange.com",
            "accessibleApplicationType": e ? "PATIENT_CENTRIC" : "NON_PATIENT_CENTRIC",
            "accessibleApplicationDescription": "any app",
            "ngConnectName": e ? "ngconnect" : "ng",
            "ngConnectUrl": e ? "https://localhost:4200" : "https://localhost:4200"
        }
    }

    let client;
    let accessibleApplicationId;
    let eventAuditsChecked = [];
    let eventAudit, persistedaccessibleApplication, persistedaccessibleApplications;
    let accessibleAppl = accessibleApplication(true);

    before(createClient);

    describe('/accessible-applications', () => {
        //     before(createDataSource);
        before(() => postaccessibleApplications(accessibleApplication(true)));

        describe('POST', () => {
            // describe('Verify audit details', function () {
            //     before(() => waitForEventAudit('CREATE_ACCESSIBLE_APPLICATION'));

            //     it('should have the correct details', function () {
            //         expect(eventAudit).to.include({
            //             action: 'CREATE_ACCESSIBLE_APPLICATION',
            //             userId: 'admin',
            //             eventId: 'Application Activity',
            //             outcome: 0,
            //             eventTypeCode: 'SOFTWARE_CONFIGURATION',
            //             eventActionCode: 'C',
            //             participantObjectQuery: '/api/v1/accessible-applications'
            //         });
            //     });

            //     it('should have 1 participant object', function () {
            //         expect(_.size(eventAudit.participantObjects)).to.equal(1);
            //     });

            //     it('should have the correct participant object', function () {
            //         expect(_.first(eventAudit.participantObjects)).to.include({
            //             participantObjectId: accessibleApplicationId,
            //             participantObjectTypeCode: 181,  
            //             participantObjectIdTypeCode: 12  
            //         });
            //     });
            // });

            describe('When url contains http:// for ngConnectUrl', () => {
                it('should throw schema validation error', async () => {
                    const invalidaccessibleApplication = Object.assign({}, accessibleApplication(true));
                    invalidaccessibleApplication.ngConnectUrl = 'http://accessible.application:9090';
                    invalidaccessibleApplication.ngConnectName = 'some-acc-applications';
                    let validationFailed = true;
                    try {
                        await postaccessibleApplications(invalidaccessibleApplication);
                        validationFailed = false;
                    } catch (e) {
                        expect(e.message).to.contain('Schema validation failed');
                    }
                    if (!validationFailed) {
                        throw new Error(`expecting schema validation to fail for the payload: ${JSON.stringify(invalidaccessibleApplication)}`);
                    }
                });
            });


            describe('When url contains http:// for accessibleApplicationUrl', () => {
                it('should throw schema validation error', async () => {
                    const invalidaccessibleApplication = Object.assign({}, accessibleApplication(true));
                    invalidaccessibleApplication.accessibleApplicationUrl = 'http://accessible.application:9090';
                    invalidaccessibleApplication.ngConnectName = 'someacc-applications';
                    let validationFailed = true;
                    try {
                        await postaccessibleApplications(invalidaccessibleApplication);
                        validationFailed = false;
                    } catch (e) {
                        expect(e.message).to.contain('Schema validation failed');
                    }
                    if (!validationFailed) {
                        throw new Error(`expecting schema validation to fail for the payload: ${JSON.stringify(invalidaccessibleApplication)}`);
                    }
                });
            });

            describe('When ngConnectName and ngConnectUrl are not provided for Patient centric accessibleApplicationUrl', () => {
                it('should throw schema validation error', async () => {
                    const invalidaccessibleApplication = Object.assign({}, accessibleApplication(true));
                    invalidaccessibleApplication.ngConnectName = '';
                    invalidaccessibleApplication.ngConnectUrl = '';
                    let validationFailed = true;
                    try {
                        await postaccessibleApplications(invalidaccessibleApplication);
                        validationFailed = false;
                    } catch (e) {
                        expect(e.message).to.contain('Schema validation failed');
                    }
                    if (!validationFailed) {
                        throw new Error(`expecting schema validation to fail for the payload: ${JSON.stringify(invalidaccessibleApplication)}`);
                    }
                });
            });


        });

        describe('GET', () => {
            describe('Search and Read', () => {
                describe('When searching for an accessible application filtering with accessible Application Name', () => {

                    before(() => searchaccessibleApplications('accessibleApplicationName', accessibleAppl.accessibleApplicationName));
                    describe('Verify resource', () => {
                        it('should find 1 system', () => {
                            expect(_.size(persistedaccessibleApplications.data)).to.equal(1);
                        });

                        it('should have the correct description', () => {
                            expect(persistedaccessibleApplication.accessibleApplicationDescription)
                                .to.equal(accessibleAppl.accessibleApplicationDescription);
                        });

                        it('should have the correct name', () => {
                            expect(persistedaccessibleApplication.accessibleApplicationName)
                                .to.equal(accessibleAppl.accessibleApplicationName);
                        });

                        it('should have the correct type', () => {
                            expect(persistedaccessibleApplication.accessibleApplicationType)
                                .to.equal(accessibleAppl.accessibleApplicationType);
                        });

                        it('should have the correct URL', () => {
                            expect(persistedaccessibleApplication.accessibleApplicationUrl)
                                .to.equal(accessibleAppl.accessibleApplicationUrl);
                        });
                    });

                    // describe('Verify audit details', function () {
                    //     before(() => waitForEventAudit('SEARCH_AND_READ_ACCESSIBLE_APPLICATIONS'));

                    //     it('should have the correct details', function () {
                    //         expect(eventAudit).to.include({
                    //             action: 'SEARCH_AND_READ_ACCESSIBLE_APPLICATIONS',
                    //             userId: 'admin',
                    //             eventId: 'Application Activity',
                    //             outcome: 0,
                    //             eventTypeCode: 'SOFTWARE_CONFIGURATION',
                    //             eventActionCode: 'R',
                    //             participantObjectQuery: '/api/v1/accessible-applications?accessibleApplicationName=abc'
                    //         });
                    //     });

                    //     it('should have 1 participant object', function () {
                    //         expect(_.size(eventAudit.participantObjects)).to.equal(1);
                    //     });

                    //     it('should have the correct participant object', function () {
                    //         expect(_.first(eventAudit.participantObjects)).to.include({
                    //             participantObjectId: externalSystemId,
                    //             participantObjectTypeCode: 181,
                    //             participantObjectIdTypeCode: 12
                    //         });
                    //     });
                    // });
                });


                describe('When searching for a existing accessible application with accessible Application Type', () => {
                    before(() => searchaccessibleApplications('accessibleApplicationType', accessibleAppl.accessibleApplicationType));

                    describe('Verify resource', () => {
                        it('should not find any systems', () => {
                            expect(_.size(persistedaccessibleApplications.data)).to.equal(1);
                        });

                        it('should have the correct description', () => {
                            expect(persistedaccessibleApplication.accessibleApplicationDescription)
                                .to.equal(accessibleAppl.accessibleApplicationDescription);
                        });

                        it('should have the correct name', () => {
                            expect(persistedaccessibleApplication.accessibleApplicationName)
                                .to.equal(accessibleAppl.accessibleApplicationName);
                        });

                        it('should have the correct type', () => {
                            expect(persistedaccessibleApplication.accessibleApplicationType)
                                .to.equal(accessibleAppl.accessibleApplicationType);
                        });

                        it('should have the correct URL', () => {
                            expect(persistedaccessibleApplication.accessibleApplicationUrl)
                                .to.equal(accessibleAppl.accessibleApplicationUrl);
                        });
                    });

                    // describe('Verify audit details', function () {
                    //     before(() => waitForEventAudit('SEARCH_AND_READ_ACCESSIBLE_APPLICATIONS'));

                    //     it('should have the correct details', function () {
                    //         expect(eventAudit).to.include({
                    //             action: 'SEARCH_AND_READ_ACCESSIBLE_APPLICATIONS',
                    //             userId: 'admin',
                    //             eventId: 'Application Activity',
                    //             outcome: 0,
                    //             eventTypeCode: 'SOFTWARE_CONFIGURATION',
                    //             eventActionCode: 'R',
                    //             participantObjectQuery: '/api/v1/accessible-applications?accessibleApplicationName=abc'
                    //         });
                    //     });

                    //     it('should have 1 participant object', function () {
                    //         expect(_.size(eventAudit.participantObjects)).to.equal(1);
                    //     });

                    //     it('should have the correct participant object', function () {
                    //         expect(_.first(eventAudit.participantObjects)).to.include({
                    //             participantObjectId: externalSystemId,
                    //             participantObjectTypeCode: 181,
                    //             participantObjectIdTypeCode: 12
                    //         });
                    //     });
                    // });
                });




                describe('When searching for a non-existent accessible application', () => {
                    before(() => searchaccessibleApplications('accessibleApplicationName', 'abc'));

                    describe('Verify resource', () => {
                        it('should not find any systems', () => {
                            expect(_.size(persistedaccessibleApplications.data)).to.equal(0);
                        });

                    });

                    describe('Verify audit details', () => {
                        before(() => waitForEventAudit('SEARCH_AND_READ_ACCESSIBLE_APPLICATIONS'));

                        it('should have the correct details', () => {
                            expect(eventAudit).to.include({
                                action: 'SEARCH_AND_READ_ACCESSIBLE_APPLICATIONS',
                                userId: 'admin',
                                eventId: 'Application Activity',
                                outcome: 0,
                                eventTypeCode: 'SOFTWARE_CONFIGURATION',
                                eventActionCode: 'R',
                                participantObjectQuery: '/api/v1/accessible-applications?accessibleApplicationName=abc'
                            });
                        });

                        it('should have 1 participant object', () => {
                            expect(_.size(eventAudit.participantObjects)).to.equal(1);
                        });

                        it('should have the correct participant object', () => {
                            expect(_.first(eventAudit.participantObjects)).to.include({
                                participantObjectId: 'NOT-APPLICABLE',
                                participantObjectTypeCode: 169,
                                participantObjectIdTypeCode: 104
                            });
                        });
                    });
                });
            });

            describe('Read', () => {
                before(() => getaccessibleApplication());

                describe('Verify resource', function () {
                    it('should have the correct description', () => {
                        expect(persistedaccessibleApplication.accessibleApplicationDescription)
                            .to.equal(accessibleAppl.accessibleApplicationDescription);
                    });

                    it('should have the correct name', () => {
                        expect(persistedaccessibleApplication.accessibleApplicationName)
                            .to.equal(accessibleAppl.accessibleApplicationName);
                    });

                    it('should have the correct type', () => {
                        expect(persistedaccessibleApplication.accessibleApplicationType)
                            .to.equal(accessibleAppl.accessibleApplicationType);
                    });

                    it('should have the correct URL', () => {
                        expect(persistedaccessibleApplication.accessibleApplicationUrl)
                            .to.equal(accessibleAppl.accessibleApplicationUrl);
                    });

                });

                //     describe('Verify audit details', function () {
                //         before(() => waitForEventAudit('READ_ACCESSIBLE_APPLICATIONS'));

                //         it('should have the correct details', function () {
                //             expect(eventAudit).to.include({
                //                 action: 'READ_ACCESSIBLE_APPLICATIONS',
                //                 userId: 'admin',
                //                 eventId: 'Application Activity',
                //                 outcome: 0,
                //                 eventTypeCode: 'SOFTWARE_CONFIGURATION',
                //                 eventActionCode: 'R',
                //                 participantObjectQuery: `/api/v1/accessible-applications/${accessibleApplicationId}`
                //             });
                //         });

                //         it('should have 1 participant object', function () {
                //             expect(_.size(eventAudit.participantObjects)).to.equal(1);
                //         });

                //         it('should have the correct participant object', function () {
                //             expect(_.first(eventAudit.participantObjects)).to.include({
                //                 participantObjectId: externalSystemId,
                //                 participantObjectTypeCode: 181,
                //                 participantObjectIdTypeCode: 12
                //             });
                //         });
                //     });
            });
        });

        describe('PUT', () => {

            before(putaccessibleApplication);
            before(() => getaccessibleApplication());

            describe('Verify resource', () => {
                it('should have an updated name', () => {
                    expect(persistedaccessibleApplication.accessibleApplicationName).to.equal('Updated Name');
                });
            });

            // describe('Verify audit details', function () {
            //     before(() => waitForEventAudit('UPDATE_ACCESSIBLE_APPLICATION'));

            //     it('should have the correct details', function () {
            //         expect(eventAudit).to.include({
            //             action: 'UPDATE_ACCESSIBLE_APPLICATION',
            //             userId: 'admin',
            //             eventId: 'Application Activity',
            //             outcome: 0,
            //             eventTypeCode: 'SOFTWARE_CONFIGURATION',
            //             eventActionCode: 'U',
            //             participantObjectQuery: `/api/v1/accessible-applications/${accessibleApplicationId}`
            //         });
            //     });

            //     it('should have 1 participant object', function () {
            //         expect(_.size(eventAudit.participantObjects)).to.equal(1);
            //     });

            //     it('should have the correct participant object', function () {
            //         expect(_.first(eventAudit.participantObjects)).to.include({
            //             participantObjectId: externalSystemId,
            //             participantObjectTypeCode: 181,
            //             participantObjectIdTypeCode: 12
            //         });
            //     });
            // });
        });

        describe('PATCH', () => {
            before(patchaccessibleApplication);
            before(() => getaccessibleApplication());

            describe('Verify resource', () => {
                it('should have an updated name', () => {
                    expect(persistedaccessibleApplication.accessibleApplicationName).to.equal('Patched Name');
                });
            });

            //     describe('Verify audit details', function () {
            //         before(() => waitForEventAudit('UPDATE_ACCESSIBLE_APPLICATION'));

            //         it('should have the correct details', function () {
            //             expect(eventAudit).to.include({
            //                 action: 'UPDATE_ACCESSIBLE_APPLICATION',
            //                 userId: 'admin',
            //                 eventId: 'Application Activity',
            //                 outcome: 0,
            //                 eventTypeCode: 'SOFTWARE_CONFIGURATION',
            //                 eventActionCode: 'U',
            //                 participantObjectQuery: `/api/v1/accessible-applications/${accessibleApplicationId}`
            //             });
            //         });

            //         it('should have 1 participant object', function () {
            //             expect(_.size(eventAudit.participantObjects)).to.equal(1);
            //         });

            //         it('should have the correct participant object', function () {
            //             expect(_.first(eventAudit.participantObjects)).to.include({
            //                 participantObjectId: externalSystemId,
            //                 participantObjectTypeCode: 181,
            //                 participantObjectIdTypeCode: 12
            //             });
            //         });
            //     });
        });

        describe('DELETE', () => {
            before(deleteAccessibleApplication);
            before(() => getaccessibleApplication(404));

            describe('Verify resource', () => {
                it('should have deleted the system', () => {
                    expect(persistedaccessibleApplication.message)
                        .to.equal(`accessible-application ${accessibleApplicationId} does not exist`);
                });
            });

            //     describe('Verify audit details', function () {
            //         before(() => waitForEventAudit('DELETE_ACCESSIBLE_APPLICATION'));

            //         it('should have the correct details', function () {
            //             expect(eventAudit).to.include({
            //                 action: 'DELETE_ACCESSIBLE_APPLICATION',
            //                 userId: 'admin',
            //                 eventId: 'Application Activity',
            //                 outcome: 0,
            //                 eventTypeCode: 'SOFTWARE_CONFIGURATION',
            //                 eventActionCode: 'D',
            //                 participantObjectQuery: `/api/v1/accessible-applications/${externalSystemId}`
            //             });
            //         });

            //         it('should have 1 participant object', function () {
            //             expect(_.size(eventAudit.participantObjects)).to.equal(1);
            //         });

            //         it('should have the correct participant object', function () {
            //             expect(_.first(eventAudit.participantObjects)).to.include({
            //                 participantObjectId: externalSystemId,
            //                 participantObjectTypeCode: 181,
            //                 participantObjectIdTypeCode: 12
            //             });
            //         });
            //     });


            describe('When accessibleApplication is non patient centric both ngconnectURL and ngconnectName are not mandatory ', () => {
                it('should create accessible application with out having ngConnectName and ngConnectUrl', async () => {
                    const invalidaccessibleApplication = Object.assign({}, accessibleApplication(false));
                    invalidaccessibleApplication.accessibleApplicationType = 'NON_PATIENT_CENTRIC';
                    delete invalidaccessibleApplication['ngConnectName'];
                    delete invalidaccessibleApplication['ngConnectUrl'];
                    await postaccessibleApplications(invalidaccessibleApplication);
                    await getaccessibleApplication(200);
                });
            });



        });

    });


    function createClient() {
        client = mirthTest.createPromiseClient();
    }

    function waitForEventAudit(action, attemptCount = 1, maxAttempts = 10) {
        let endpoint = `${eventAuditEndpoint}?action=${action}`;
        let expectedCount = 0;

        return makeRequest('get', endpoint).then(function (response) {
            let eventAudits = _.reject(response.body.data, function (eventAudit) {
                return eventAuditsChecked.includes(eventAudit.id);
            });

            if (eventAudits.length >= expectedCount) {
                eventAudit = _.first(eventAudits);
                eventAuditsChecked = eventAuditsChecked.concat(_.map(eventAudits, 'id'));
            } else {
                assert(attemptCount < maxAttempts, 'Timed out waiting for event audit to be inserted');

                // Wait a second before trying again
                return Bluebird.delay(500).then(function () {
                    return waitForEventAudit(action, ++attemptCount);
                });
            }
        });
    }

    function postaccessibleApplications(accessibleApplication) {
        return makeRequest('post', accessibleApplicationEndpoint, accessibleApplication)
            .then((response) => {
                accessibleApplicationId = response.body.id
            })
            .then(updateDocuments);
    }

    function postInvalidExternalSystem() {
        return makeRequest('post', externalSystemEndpoint, {
            dataSourceIdentifier: 'INVALID_DATA_SOURCE_IDENTIFIER',
            externalSystemDescription: 'Invalid',
            externalSystemName: 'Invalid',
            externalSystemType: 'EXTERNAL_DOCUMENT_SEARCH',
            externalSystemUrl: 'https://localhost.com:9123'
        }, 400);
    }

    function searchaccessibleApplications(filtercateg, value) {
        return makeRequest('get', `${accessibleApplicationEndpoint}?${filtercateg}=${value}`)
            .then(function (response) {
                persistedaccessibleApplications = response.body;
                persistedaccessibleApplication = _.first(persistedaccessibleApplications.data) || {};
            });
    }

    function getaccessibleApplication(expectedResponseCode) {
        return makeRequest('get', `${accessibleApplicationEndpoint}/${accessibleApplicationId}`, null, expectedResponseCode)
            .then((response) => persistedaccessibleApplication = response.body || {});
    }

    function putaccessibleApplication() {
        let endpoint = `${accessibleApplicationEndpoint}/${accessibleApplicationId}`;

        return makeRequest('get', `${endpoint}?meta=true`).then(function (response) {
            return client.put(endpoint)
                .set('If-Match', response.body._meta._etag)
                .send(_.merge(accessibleAppl, { accessibleApplicationName: 'Updated Name' }))
                .auth(mirthTest.constants.USERNAME, mirthTest.constants.PASSWORD)
                .expect((res) => assert(res.status === 200, res.text));
        }).then(updateDocuments);
    }

    function patchaccessibleApplication() {
        let endpoint = `${accessibleApplicationEndpoint}/${accessibleApplicationId}`;
        return makeRequest('patch', endpoint, {
            accessibleApplicationName: 'Patched Name'
        }).then(updateDocuments);
    }

    function deleteAccessibleApplication() {
        return makeRequest('delete', `${accessibleApplicationEndpoint}/${accessibleApplicationId}`);
    }

    function makeRequest(method, endpoint, document, expectedResponseCode = 200) {
        return client[method](endpoint)
            .send(document)
            .auth(mirthTest.constants.USERNAME, mirthTest.constants.PASSWORD)
            .expect((res) => assert(res.status === expectedResponseCode, res.text));
    }

    function updateDocuments() {
        return mirthSearchLoader.updateDocuments(null, { refresh: 'wait_for' });
    }

});


