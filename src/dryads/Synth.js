
import {Dryad} from 'dryadic';
import {synthNew, nodeFree, AddActions} from '../server/osc/msg';
import {whenNodeGo, whenNodeEnd, updateNodeState} from '../server/node-watcher';
import * as _  from 'underscore';


/**
 * Creates a synth on the server.
 *
 */
export default class Synth extends Dryad {

   /**
   * @param {String|SynthDef|CompileSynthDef} def - the name of the synthDef
   *     or a Dryad that will respond to defName()
   * @param {Object} args - Arguments may be int|float|string|Dryad
   */
  constructor(def, args={}, children=[]) {
    super({
      def: def,
      args: args
    }, children);
  }

  /**
   * If there is no SCServer in the parent context,
   * then this will wrap itself in an SCServer
   */
  requireParent() {
    return 'SCServer';
  }

  subgraph() {
    var sg = [];
    // clone and tag each one so they can be looked up during .add
    _.each(this.properties.args, (v, k) => {
      if (v.isDryad) {
        let nv = v.clone();
        nv.tag = k;
        sg.push(nv);
      }
    });

    sg.push(this);

    // wrap self in SynthDef
    let def = this.properties.def;
    if (def.isDryad) {
      let d = def.clone();
      d.tag = 'def';
      d.children = d.children.concat(sg);
      return d;
    }

    return sg;
  }

  prepareForAdd() {
    return {
      nodeID: (context) => context.scserver.state.nextNodeID(),
      synthDefName: (context) => {
        return this.synthDefName(context);
      }
    };
  }

  synthDefName(context) {
    let name = _.isString(this.properties.def) ? this.properties.def : context.synthDef.name;
    if (!name) {
      throw new Error('No synthDefName supplied to Synth', context);
    }
    return name;
  }

  add() {
    return {
      scserver: {
        msg: (context) => {
          let args = _.mapObject(this.properties.args, (v, k) => {
            // Use the cloned one in context.subgraph, not the original supplied as an arg
            return v.isDryad ? context.subgraph[k].dryad.synthArg(context.subgraph[k].context) : v;
          });
          return synthNew(context.synthDefName, context.nodeID, AddActions.TAIL, context.group, args);
        }
      },
      run: (context) => {
        return whenNodeGo(context.scserver, context.id, context.nodeID)
          .then((nodeID) => {
            updateNodeState(context.scserver, context.nodeID, {synthDef: context.synthDefName});
            return nodeID;
          });
      }
    };
  }

  remove() {
    return {
      scserver: {
        msg: (context) => nodeFree(context.nodeID)
      },
      run: (context) => whenNodeEnd(context.scserver, context.id, context.nodeID)
    };
  }
}
