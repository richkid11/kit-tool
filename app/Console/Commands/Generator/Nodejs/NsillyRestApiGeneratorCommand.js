import { Command } from '../../Command';
import { Console } from '@vicoders/console';
import { App } from '@nsilly/container';
import { NodejsBasicRestApiHandler } from './Handlers/NodejsBasicRestApiHandler';
import { RelationGeneratorHandler } from './Handlers/RelationGeneratorHandler';
import { CategoryProductGeneratorHandler } from './Handlers/CategoryProductGeneratorHandler';
import { StripeGeneratorHandler } from './Handlers/StripeGeneratorHandler';
import { ImageGeneratorHandler } from './Handlers/ImageGeneratorHandler';
export default class LaravelRestApiGeneratorCommand extends Command {
  signature() {
    return 'nodejs';
  }

  description() {
    return 'Nodejs REST API Generator';
  }

  options() {
    return [{ key: 'override?', description: 'Override existing file.' }];
  }

  async handle(options) {
    const type = await Console.select('type', [
      { name: 'basic', description: 'Basic REST API NodeJS' },
      { name: 'relation', description: 'Relation N-N' },
      { name: 'category_product', description: 'Category_Product API' },
      { name: 'image', description: 'Image Table' },
      { name: 'stripe', description: 'Stripe Service' }
    ]);

    switch (type.name) {
      case 'basic':
        App.make(NodejsBasicRestApiHandler).handle(options);
        break;
      case 'relation':
        App.make(RelationGeneratorHandler).handle();
        break;
      case 'category_product':
        App.make(CategoryProductGeneratorHandler).handle();
        break;
      case 'image':
        App.make(ImageGeneratorHandler).handle();
        break;
      case 'stripe':
        App.make(StripeGeneratorHandler).handle();
        break;
      default:
        break;
    }
  }
}
