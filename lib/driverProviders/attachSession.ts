/*
 *  This is an implementation of the Attach Session Driver Provider.
 *  It is responsible for setting up the account object, tearing
 *  it down, and setting up the driver correctly.
 */
import * as q from 'q';
import {WebDriver} from 'selenium-webdriver';
import * as executors from 'selenium-webdriver/executors';

import {Config} from '../config';
import {Logger} from '../logger';

import {DriverProvider} from './driverProvider';

let logger = new Logger('attachSession');

export class AttachSession extends DriverProvider {
  constructor(config: Config) {
    super(config);
  }

  /**
   * Configure and launch (if applicable) the object's environment.
   * @public
   * @return {q.promise} A promise which will resolve when the environment is
   *     ready to test.
   */
  setupEnv(): q.Promise<any> {
    logger.info('Using the selenium server at ' + this.config_.seleniumAddress);
    logger.info('Using session id - ' + this.config_.seleniumSessionId);
    return q(undefined);
  }

  /**
   * Getting a new driver by attaching an existing session.
   *
   * @public
   * @return {WebDriver} webdriver instance
   */
  getNewDriver(): WebDriver {
    let executor = executors.createExecutor(this.config_.seleniumAddress);
    let newDriver = WebDriver.attachToSession(executor, this.config_.seleniumSessionId);
    this.drivers_.push(newDriver);
    return newDriver;
  }

  /**
   * Maintains the existing session and does not quit the driver.
   *
   * @public
   */
  quitDriver(): q.Promise<WebDriver> {
    let defer = q.defer<WebDriver>();
    defer.resolve(null);
    return defer.promise;
  }
}
