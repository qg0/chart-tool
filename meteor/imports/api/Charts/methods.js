import { Meteor } from 'meteor/meteor';
import MD5 from 'crypto-js/md5';
import Charts from './Charts';
import { extend, queryConstructor } from '../../modules/utils';
import { app_settings } from '../../modules/settings';

Meteor.methods({
  // addChart only takes the text and data from the /new route
  // everything else is taken from settings.js in /lib
  'chart.add'(text, data) {
    const newChart = extend(app_settings.chart),
      now = new Date();

    newChart.createdAt = now;
    newChart.lastEdited = now;
    newChart.slug = text;
    newChart.data = data;
    newChart.md5 = MD5(data).toString();

    return Charts.insert(newChart);
  },

  'chart.delete'(chartId) {
    return Charts.remove(chartId);
  },

  'chart.fork'(chartId) {
    const newChart = Charts.findOne(chartId),
      now = new Date();

    newChart.createdAt = now;
    newChart.lastEdited = now;

    delete newChart._id;

    return Charts.insert(newChart);
  },

  'chart.update.multiple.fields'(chartId, fields) {
    const obj = {};
    fields.map(f => { obj[f.field] = f.value; });
    obj.lastEdited = new Date();
    return Charts.update(chartId, { $set: obj });
  },

  // Update methods

  'chart.update.slug'(chartId, text) {
    return Charts.update(chartId, {
      $set: {
        slug: text,
        lastEdited: new Date()
      }
    });
  },

  'chart.update.data'(chartId, data) {
    return Charts.update(chartId, {
      $set: {
        data: data,
        md5: MD5(data).toString(),
        lastEdited: new Date()
      }
    });
  },
  'chart.update.dateformat'(chartId, format) {
    return Charts.update(chartId, {
      $set: {
        date_format: format,
        lastEdited: new Date()
      }
    });
  },
  'chart.update.hashours'(chartId, hasHours) {
    return Charts.update(chartId, {
      $set: {
        hasHours: hasHours,
        lastEdited: new Date()
      }
    });
  },
  'charts.update.heading'(chartId, hed) {
    return Charts.update(chartId, {
      $set: {
        heading: hed,
        lastEdited: new Date()
      }
    });
  },
  'chart.update.qualifier'(chartId, qual) {
    return Charts.update(chartId, {
      $set: {
        qualifier: qual,
        lastEdited: new Date()
      }
    });
  },
  'chart.update.source'(chartId, src) {
    return Charts.update(chartId, {
      $set: {
        source: src,
        lastEdited: new Date()
      }
    });
  },
  'chart.update.class'(chartId, customClass) {
    return Charts.update(chartId, {
      $set: {
        class: customClass,
        lastEdited: new Date()
      }
    });
  },
  'chart.update.img'(chartId, src) {
    return Charts.update(chartId, {
      $set: {
        img: src,
        lastEdited: new Date()
      }
    });
  },
  'chart.update.tags'(chartId, tagName) {

    const taggedArr = Charts.findOne(chartId).tags,
      index = taggedArr.indexOf(tagName);

    if (index > -1) {
      // tag is already in chart, remove it
      taggedArr.splice(index, 1);
    } else {
      // add tag to chart
      taggedArr.push(tagName);
    }

    return Charts.update(chartId, {
      $set: {
        tags: taggedArr,
        lastEdited: new Date()
      }
    });
  },

  // 'Options' methods

  'chart.update.options.type'(chartId, type) {
    return Charts.update(chartId, {
      $set: {
        'options.type': type,
        lastEdited: new Date()
      }
    });
  },
  'chart.update.options.interpolation'(chartId, interpolation) {
    return Charts.update(chartId, {
      $set: {
        'options.interpolation': interpolation,
        lastEdited: new Date()
      }
    });
  },
  'chart.update.options.stacked'(chartId, stacked) {
    return Charts.update(chartId, {
      $set: {
        'options.stacked': stacked,
        lastEdited: new Date()
      }
    });
  },
  'chart.update.options.expanded'(chartId, expanded) {
    return Charts.update(chartId, {
      $set: {
        'options.expanded': expanded,
        lastEdited: new Date()
      }
    });
  },
  'chart.update.options.head'(chartId, head) {
    return Charts.update(chartId, {
      $set: {
        'options.head': head,
        lastEdited: new Date()
      }
    });
  },
  'chart.update.options.deck'(chartId, deck) {
    return Charts.update(chartId, {
      $set: {
        'options.deck': deck,
        lastEdited: new Date()
      }
    });
  },
  'chart.update.options.legend'(chartId, legend) {
    return Charts.update(chartId, {
      $set: {
        'options.legend': legend,
        lastEdited: new Date()
      }
    });
  },
  'chart.update.options.footer'(chartId, footer) {
    return Charts.update(chartId, {
      $set: {
        'options.footer': footer,
        lastEdited: new Date()
      }
    });
  },
  'chart.update.options.x_axis'(chartId, x_axis) {
    return Charts.update(chartId, {
      $set: {
        'options.x_axis': x_axis,
        lastEdited: new Date()
      }
    });
  },
  'chart.update.options.y_axis'(chartId, y_axis) {
    return Charts.update(chartId, {
      $set: {
        'options.y_axis': y_axis,
        lastEdited: new Date()
      }
    });
  },
  'chart.update.options.tips'(chartId, tips) {
    return Charts.update(chartId, {
      $set: {
        'options.tips': tips,
        lastEdited: new Date()
      }
    });
  },
  'chart.update.options.annotations'(chartId, annotations) {
    return Charts.update(chartId, {
      $set: {
        'options.annotations': annotations,
        lastEdited: new Date()
      }
    });
  },
  'chart.update.options.qualifier'(chartId, qualifier) {
    return Charts.update(chartId, {
      $set: {
        'options.qualifier': qualifier,
        lastEdited: new Date()
      }
    });
  },
  'chart.update.options.share_data'(chartId, shareData) {
    return Charts.update(chartId, {
      $set: {
        'options.share_data': shareData,
        lastEdited: new Date()
      }
    });
  },
  'chart.update.options.social'(chartId, social) {
    return Charts.update(chartId, {
      $set: {
        'options.social': social,
        lastEdited: new Date()
      }
    });
  },
  'chart.update.options.indexed'(chartId, index) {
    return Charts.update(chartId, {
      $set: {
        'options.indexed': index,
        lastEdited: new Date()
      }
    });
  },

  // X Axis methods

  'chart.update.x_axis.scale'(chartId, scale) {
    return Charts.update(chartId, {
      $set: {
        'x_axis.scale': scale,
        lastEdited: new Date()
      }
    });
  },
  'chart.update.x_axis.ticks'(chartId, ticks) {
    return Charts.update(chartId, {
      $set: {
        'x_axis.ticks': ticks,
        lastEdited: new Date()
      }
    });
  },
  'chart.update.x_axis.orient'(chartId, orient) {
    return Charts.update(chartId, {
      $set: {
        'x_axis.orient': orient,
        lastEdited: new Date()
      }
    });
  },
  'chart.update.x_axis.format'(chartId, format) {
    return Charts.update(chartId, {
      $set: {
        'x_axis.format': format,
        lastEdited: new Date()
      }
    });
  },
  'chart.update.x_axis.prefix'(chartId, pfx) {
    return Charts.update(chartId, {
      $set: {
        'x_axis.prefix': pfx,
        lastEdited: new Date()
      }
    });
  },
  'chart.update.x_axis.suffix'(chartId, sfx) {
    return Charts.update(chartId, {
      $set: {
        'x_axis.suffix': sfx,
        lastEdited: new Date()
      }
    });
  },
  'chart.update.x_axis.min'(chartId, minY) {
    return Charts.update(chartId, {
      $set: {
        'x_axis.min': minY,
        lastEdited: new Date()
      }
    });
  },
  'chart.update.x_axis.max'(chartId, maxY) {
    return Charts.update(chartId, {
      $set: {
        'x_axis.max': maxY,
        lastEdited: new Date()
      }
    });
  },
  'chart.update.x_axis.nice'(chartId, nice) {
    return Charts.update(chartId, {
      $set: {
        'x_axis.nice': nice,
        lastEdited: new Date()
      }
    });
  },

  // Y Axis methods

  'chart.update.y_axis.scale'(chartId, scale) {
    return Charts.update(chartId, {
      $set: {
        'y_axis.scale': scale,
        lastEdited: new Date()
      }
    });
  },
  'chart.update.y_axis.ticks'(chartId, ticks) {
    return Charts.update(chartId, {
      $set: {
        'y_axis.ticks': ticks,
        lastEdited: new Date()
      }
    });
  },
  'chart.update.y_axis.orient'(chartId, orient) {
    return Charts.update(chartId, {
      $set: {
        'y_axis.orient': orient,
        lastEdited: new Date()
      }
    });
  },
  'chart.update.y_axis.format'(chartId, format) {
    return Charts.update(chartId, {
      $set: {
        'y_axis.format': format,
        lastEdited: new Date()
      }
    });
  },
  'chart.update.y_axis.prefix'(chartId, pfx) {
    return Charts.update(chartId, {
      $set: {
        'y_axis.prefix': pfx,
        lastEdited: new Date()
      }
    });
  },
  'chart.update.y_axis.suffix'(chartId, sfx) {
    return Charts.update(chartId, {
      $set: {
        'y_axis.suffix': sfx,
        lastEdited: new Date()
      }
    });
  },
  'chart.update.y_axis.min'(chartId, minY) {
    return Charts.update(chartId, {
      $set: {
        'y_axis.min': minY,
        lastEdited: new Date()
      }
    });
  },
  'chart.update.y_axis.max'(chartId, maxY) {
    return Charts.update(chartId, {
      $set: {
        'y_axis.max': maxY,
        lastEdited: new Date()
      }
    });
  },
  'chart.update.y_axis.nice'(chartId, nice) {
    return Charts.update(chartId, {
      $set: {
        'y_axis.nice': nice,
        lastEdited: new Date()
      }
    });
  },

  // Other methods

  'chart.reset.x_axis'(chartId) {
    return Charts.update(chartId, {
      $set: {
        x_axis: app_settings.chart.x_axis,
        lastEdited: new Date()
      }
    });
  },
  'chart.reset.y_axis'(chartId) {
    return Charts.update(chartId, {
      $set: {
        y_axis: app_settings.chart.y_axis,
        lastEdited: new Date()
      }
    });
  },

  // Print methods

  'chart.update.print.mode'(chartId, mode) {
    const obj = {
      'print.mode': mode,
      lastEdited: new Date()
    };
    if (mode === 'millimetres') {
      const chart = Charts.findOne(chartId);
      if (!chart.print.height) {
        obj['print.height'] = Number(app_settings.print.column_width);
      }
      if (!chart.print.width) {
        obj['print.width'] = Number(app_settings.print.column_width);
      }
    }
    return Charts.update(chartId, {
      $set: obj
    });
  },
  'chart.update.print.columns'(chartId, cols) {
    return Charts.update(chartId, {
      $set: {
        'print.columns': cols,
        lastEdited: new Date()
      }
    });
  },
  'chart.update.print.lines'(chartId, lines) {
    return Charts.update(chartId, {
      $set: {
        'print.lines': lines,
        lastEdited: new Date()
      }
    });
  },
  'chart.update.print.width'(chartId, width) {
    return Charts.update(chartId, {
      $set: {
        'print.width': Number(width),
        lastEdited: new Date()
      }
    });
  },
  'chart.update.print.height'(chartId, height) {
    return Charts.update(chartId, {
      $set: {
        'print.height': Number(height),
        lastEdited: new Date()
      }
    });
  },

  // Stats methods

  matchedCharts(params) {
    const parameters = queryConstructor(params);
    delete parameters.options.limit;
    return Charts.find(parameters.find, parameters.options).count();
  }
});
